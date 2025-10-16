import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'; // si ya lo tienes

@UseGuards(JwtAuthGuard) // quítalo si todavía no quieres protección
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly service: VehiclesService) {}

  /**
   * Crea un nuevo vehículo.
   * Método: POST
   * Ruta: /vehicles
   * 
   * Ejemplo de cuerpo (JSON):
   * {
   *   "marca": "Toyota",
   *   "modelo": "Corolla",
   *   "color": "Blanco",
   *   "kilometraje": 15000,
   *   "estado": "disponible",
   *   "fecha_ingreso": "2025-10-22",
   *   "id_concesionario": "1"
   * }
   */
  @Post()
  create(@Body() dto: CreateVehicleDto) {
    return this.service.create(dto);
  }

  /**
   * Obtiene la lista de todos los vehículos registrados.
   * Método: GET
   * Ruta: /vehicles
   */
  @Get()
  findAll() {
    return this.service.findAll();
  }

  /**
   * Obtiene un vehículo específico según su ID.
   * Método: GET
   * Ruta: /vehicles/:id
   * Ejemplo: /vehicles/3
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  /**
   * Actualiza los datos de un vehículo según su ID.
   * Método: PATCH
   * Ruta: /vehicles/:id
   * 
   * Ejemplo de cuerpo (JSON):
   * {
   *   "color": "Negro",
   *   "estado": "vendido"
   * }
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVehicleDto) {
    return this.service.update(id, dto);
  }

  /**
   * Elimina un vehículo según su ID.
   * Método: DELETE
   * Ruta: /vehicles/:id
   * Ejemplo: /vehicles/3
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

