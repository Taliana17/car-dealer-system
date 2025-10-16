// Importamos decoradores y utilidades de NestJS
import { Injectable, NotFoundException } from '@nestjs/common';
// Importamos la función para inyectar repositorios de TypeORM
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Importamos las entidades necesarias
import { Sale } from './entities/sale.entity';
import { User } from '../users/entities/user.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';

// Importamos los DTOs para crear y actualizar ventas
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

// Indicamos que esta clase es un servicio de NestJS
@Injectable()
export class SalesService {
  // Inyectamos los repositorios de las entidades necesarias
  constructor(
    @InjectRepository(Sale) private readonly salesRepo: Repository<Sale>,
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Customer) private readonly customers: Repository<Customer>,
    @InjectRepository(Vehicle) private readonly vehicles: Repository<Vehicle>,
  ) {}

  // Método para crear una nueva venta
  async create(dto: CreateSaleDto) {
    // Buscamos los registros relacionados (usuario, cliente y vehículo)
    const user = await this.users.findOneByOrFail({ id: dto.userId as any });
    const customer = await this.customers.findOneByOrFail({ id: dto.customerId as any });
    const vehicle = await this.vehicles.findOneByOrFail({ id: dto.vehicleId as any });

    // Creamos una nueva venta con los datos del DTO y las relaciones encontradas
    const sale = this.salesRepo.create({
      total: dto.total,
      notes: dto.notes,
      user,
      customer,
      vehicle,
    });

    // Guardamos la venta en la base de datos
    return this.salesRepo.save(sale);
  }

  // Método para obtener todas las ventas (ordenadas por fecha descendente)
  findAll() {
    return this.salesRepo.find({ order: { date: 'DESC' } });
  }

  // Método para obtener una venta por su ID
  async findOne(id: string) {
    const s = await this.salesRepo.findOne({ where: { id } });
    if (!s) throw new NotFoundException('Sale not found'); // Error si no existe
    return s;
  }

  // Método para actualizar una venta existente
  async update(id: string, dto: UpdateSaleDto) {
    // Buscamos la venta a actualizar
    const s = await this.findOne(id);

    // Actualizamos las relaciones si se envían nuevos IDs
    if (dto.userId) {
      s.user = await this.users.findOneByOrFail({ id: dto.userId as any });
    }
    if (dto.customerId) {
      s.customer = await this.customers.findOneByOrFail({ id: dto.customerId as any });
    }
    if (dto.vehicleId) {
      s.vehicle = await this.vehicles.findOneByOrFail({ id: dto.vehicleId as any });
    }

    // Actualizamos los valores simples
    if (dto.total !== undefined) s.total = dto.total;
    if (dto.notes !== undefined) s.notes = dto.notes;

    // Guardamos los cambios
    return this.salesRepo.save(s);
  }

  // Método para eliminar una venta por su ID
  async remove(id: string) {
    const s = await this.findOne(id);
    await this.salesRepo.remove(s); // Eliminamos la venta
    return { deleted: true }; // Confirmación simple
  }
}

