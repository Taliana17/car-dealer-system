// Importamos los decoradores y utilidades necesarias de NestJS
import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';

// Importamos el servicio que contiene la lógica de negocio de los usuarios
import { UsersService } from './users.service';

// Importamos los DTOs (estructuras de datos) para crear y actualizar usuarios
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Importamos el guard (protección) que requiere autenticación con JWT
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

// Protegemos todo el controlador con el guard JWT (solo usuarios autenticados pueden acceder)
@UseGuards(JwtAuthGuard)

// Definimos que este controlador manejará las rutas que comiencen con "/users"
@Controller('users')
export class UsersController {
  // Inyectamos el servicio de usuarios para usarlo en los métodos
  constructor(private readonly service: UsersService) {}

  // Ruta POST /users → crea un nuevo usuario
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }

  // Ruta GET /users → obtiene todos los usuarios
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // Ruta GET /users/:id → obtiene un usuario por su ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // Ruta PATCH /users/:id → actualiza los datos de un usuario
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.service.update(id, dto);
  }

  // Ruta DELETE /users/:id → elimina un usuario por su ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

