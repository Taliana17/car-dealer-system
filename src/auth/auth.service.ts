import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
// Injectable: permite que NestJS inyecte este servicio en otros lugares
// ConflictException: error 409 (conflicto) si ya existe un recurso

import { InjectRepository } from '@nestjs/typeorm';
// Permite inyectar repositorios de TypeORM

import { JwtService } from '@nestjs/jwt';
// Servicio para generar y firmar tokens JWT

import { Repository } from 'typeorm';
// Clase para interactuar con la base de datos mediante TypeORM

import * as argon2 from 'argon2';
// Librería para hashear y verificar contraseñas de forma segura

import { User } from '../users/entities/user.entity';
// Entidad de usuario

import { RegisterDto } from './dto/register.dto';
// DTO para el registro de usuario

import { LoginDto } from './dto/login.dto';
// DTO para el login de usuario

@Injectable()
// Marca la clase como inyectable en otros módulos
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    // Inyecta el repositorio de usuarios para poder interactuar con la base de datos
    private readonly jwt: JwtService,
    // Inyecta el servicio JWT para crear tokens
  ) {}

  // Método para registrar un nuevo usuario
  async register(dto: RegisterDto) {
    // Busca si ya existe un usuario con ese email
    const exists = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Email already exists');
    // Si existe, lanza un error 409

    // Hashea la contraseña usando argon2
    const passwordHash = await argon2.hash(dto.password);

    // Crea un nuevo usuario con email, contraseña hasheada y rol (por defecto 'seller')
    const user = this.usersRepo.create({
      email: dto.email,
      passwordHash,
      role: dto.role ?? 'seller',
    });

    // Guarda el usuario en la base de datos
    await this.usersRepo.save(user);

    // Devuelve el usuario y el token JWT generado
    return { user, ...this.sign(user) };
  }

  // Método para iniciar sesión
  async login(dto: LoginDto) {
    // Busca el usuario por email y selecciona campos necesarios
    const user = await this.usersRepo.findOne({
      where: { email: dto.email },
      select: ['id', 'email', 'passwordHash', 'role'],
    });

    // Si no existe el usuario, lanza error 401
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // Verifica que la contraseña coincida con la hasheada
    const ok = await argon2.verify(user.passwordHash, dto.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    // Si no coincide, lanza error 401

    // Devuelve el usuario y el token JWT generado
    return { user, ...this.sign(user) };
  }

  // Método privado para firmar un JWT
  private sign(user: User) {
    // Payload del token: id, email y rol del usuario
    const payload = { sub: user.id, email: user.email, role: user.role };

    // Genera y devuelve el token JWT
    return { access_token: this.jwt.sign(payload) };
  }
}

