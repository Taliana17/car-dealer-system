// Importamos los módulos necesarios de NestJS
import { Injectable, NotFoundException } from '@nestjs/common';
// Permite inyectar repositorios de TypeORM
import { InjectRepository } from '@nestjs/typeorm';
// Importamos la clase Repository de TypeORM para manejar entidades
import { Repository } from 'typeorm';
// Importamos la entidad Payment (tabla de pagos)
import { Payment } from './entities/payment.entity';
// Importamos la entidad Sale (tabla de ventas) para relacionar pagos con ventas
import { Sale } from '../sales/entities/sale.entity';
// Importamos los DTOs para crear y actualizar pagos
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

// Marcamos la clase como un servicio inyectable
@Injectable()
export class PaymentsService {
  // Inyectamos los repositorios de Payment y Sale en el constructor
  constructor(
    @InjectRepository(Payment) private repo: Repository<Payment>, // Repositorio para la tabla de pagos
    @InjectRepository(Sale) private sales: Repository<Sale>, // Repositorio para la tabla de ventas
  ) {}

  // Método para crear un nuevo pago
  async create(dto: CreatePaymentDto) {
    // Busca la venta asociada al pago usando el ID de venta que viene en el DTO
    const sale = await this.sales.findOneByOrFail({ id: dto.saleId });
    // Crea una nueva instancia de pago y la relaciona con la venta encontrada
    const p = this.repo.create({ ...dto, sale });
    // Guarda el nuevo pago en la base de datos
    return this.repo.save(p);
  }

  // Método para obtener todos los pagos
  findAll() {
    // Devuelve todos los registros de la tabla de pagos
    return this.repo.find();
  }

  // Método para obtener un pago por su ID
  async findOne(id: string) {
    // Busca un pago específico por su ID
    const p = await this.repo.findOne({ where: { id } });
    // Si no se encuentra, lanza un error 404
    if (!p) throw new NotFoundException('Payment not found');
    // Si existe, lo devuelve
    return p;
  }

  // Método para actualizar un pago
  async update(id: string, dto: UpdatePaymentDto) {
    // Busca el pago a actualizar
    const p = await this.findOne(id);
    // Si el DTO incluye un ID de venta, busca y asigna la nueva venta
    if (dto.saleId) p.sale = await this.sales.findOneByOrFail({ id: dto.saleId });
    // Actualiza los campos del pago con los nuevos valores del DTO
    Object.assign(p, dto);
    // Guarda los cambios en la base de datos
    return this.repo.save(p);
  }

  // Método para eliminar un pago
  async remove(id: string) {
    // Busca el pago por su ID
    const p = await this.findOne(id);
    // Lo elimina de la base de datos
    await this.repo.remove(p);
    // Devuelve un mensaje de confirmación
    return { deleted: true };
  }
}

