// Importamos los decoradores y clases necesarias de NestJS
import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';

// Importamos el servicio de ventas que contiene la lógica de negocio
import { SalesService } from './sales.service';

// Importamos los DTOs para crear y actualizar ventas
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

// Importamos el guard que protege las rutas (solo usuarios con token JWT pueden acceder)
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

// Aplicamos el guard a todo el controlador para proteger sus endpoints
@UseGuards(JwtAuthGuard)

// Definimos el controlador con la ruta base '/sales'
@Controller('sales')
export class SalesController {
  // Inyectamos el servicio de ventas para usar sus métodos
  constructor(private readonly service: SalesService) {}

  // Ruta POST /sales → crea una nueva venta
  @Post()
  create(@Body() dto: CreateSaleDto) {
    return this.service.create(dto);
  }

  // Ruta GET /sales → devuelve todas las ventas
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // Ruta GET /sales/:id → busca una venta específica por su ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // Ruta PATCH /sales/:id → actualiza los datos de una venta
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSaleDto) {
    return this.service.update(id, dto);
  }

  // Ruta DELETE /sales/:id → elimina una venta por su ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

