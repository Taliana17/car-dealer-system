import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from '../modules/empleado/entities/empleado.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Empleado)
    private empRepo: Repository<Empleado>,
    private jwt: JwtService,
  ) {}

  async register(email: string, password: string, payloadEmpleado: Partial<Empleado>) {
    const exists = await this.empRepo.findOne({ where: { email } });
    if (exists) throw new BadRequestException('El email ya está registrado');

   
    const passwordHash = await argon2.hash(password);

    const empleado = this.empRepo.create({ ...payloadEmpleado, email, passwordHash });
    const saved = await this.empRepo.save(empleado);
    return { id: saved.id, email: saved.email };
  }

  async login(email: string, password: string) {
    const empleado = await this.empRepo
      .createQueryBuilder('e')
      .addSelect('e.passwordHash')
      .where('e.email = :email', { email })
      .getOne();

    if (!empleado || !empleado.passwordHash) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    
    const ok = await argon2.verify(empleado.passwordHash, password);
    if (!ok) throw new UnauthorizedException('Credenciales incorrectas');

    const token = await this.jwt.signAsync({
      sub: empleado.id,
      role: empleado.cargo,
    });

    return {
      access_token: token,
      user: { id: empleado.id, email: empleado.email, role: empleado.cargo },
    };
  }
}
