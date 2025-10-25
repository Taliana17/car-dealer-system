// Importamos los módulos necesarios de NestJS
import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
// Importamos el servicio de pagos
import { PaymentsService } from './payments.service';
// Importamos los DTOs (estructuras de datos para crear y actualizar pagos)
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
// Importamos el guardia JWT para proteger las rutas con autenticación
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

// Aplicamos el guardia JWT a todo el controlador (solo usuarios con token válido pueden acceder)
@UseGuards(JwtAuthGuard)
// Definimos el controlador con la ruta base "payments"
@Controller('payments')
export class PaymentsController {
  // Inyectamos el servicio de pagos en el constructor
  constructor(private readonly service: PaymentsService) {}

  // Ruta POST /payments → crea un nuevo pago
  @Post()
  create(@Body() dto: CreatePaymentDto) {
    // Llamamos al método create del servicio, pasando los datos del cuerpo de la petición
    return this.service.create(dto);
  }

  // Ruta GET /payments → devuelve todos los pagos
  @Get()
  findAll() {
    // Llama al servicio para obtener todos los registros
    return this.service.findAll();
  }

  // Ruta GET /payments/:id → devuelve un pago específico por su ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    // Llama al servicio para buscar un pago por ID
    return this.service.findOne(id);
  }

  // Ruta PATCH /payments/:id → actualiza un pago existente
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePaymentDto) {
    // Llama al servicio para actualizar el pago con los datos enviados
    return this.service.update(id, dto);
  }

  // Ruta DELETE /payments/:id → elimina un pago por ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    // Llama al servicio para eliminar el pago
    return this.service.remove(id);
  }
}

