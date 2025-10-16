// Importamos los decoradores y clases necesarias de NestJS
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';

// Importamos herramientas para trabajar con bases de datos (TypeORM)
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Importamos la librería argon2 para encriptar contraseñas
import * as argon2 from 'argon2';

// Importamos la entidad y los DTOs (estructuras de datos) del usuario
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Marcamos esta clase como inyectable (NestJS puede gestionarla como servicio)
@Injectable()
export class UsersService {
  // Inyectamos el repositorio de usuarios para acceder a la base de datos
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>, // repositorio que maneja los datos de User
  ) {}

  // Método para crear un nuevo usuario
  async create(dto: CreateUserDto) {
    // Verificamos si el correo ya está registrado
    const exists = await this.repo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Email already registered');

    // Encriptamos la contraseña antes de guardarla
    const passwordHash = await argon2.hash(dto.password);

    // Creamos el usuario con su correo, contraseña cifrada y rol (por defecto "seller")
    const user = this.repo.create({
      email: dto.email,
      passwordHash,
      role: dto.role ?? 'seller',
    });

    // Guardamos el usuario en la base de datos
    return this.repo.save(user);
  }

  // Método para obtener todos los usuarios
  findAll() {
    return this.repo.find();
  }

  // Método para buscar un usuario por su ID
  async findOne(id: string) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // Método para actualizar un usuario
  async update(id: string, dto: UpdateUserDto) {
    const user = await this.findOne(id);

    // Si el DTO incluye una contraseña nueva, se vuelve a encriptar
    if (dto.password) {
      user.passwordHash = await argon2.hash(dto.password);
      delete (dto as any).password; // eliminamos la contraseña sin cifrar del objeto
    }

    // Actualizamos los demás campos
    Object.assign(user, dto);

    // Guardamos los cambios
    return this.repo.save(user);
  }

  // Método para eliminar un usuario
  async remove(id: string) {
    const user = await this.findOne(id);
    await this.repo.remove(user);
    return { deleted: true };
  }
}

