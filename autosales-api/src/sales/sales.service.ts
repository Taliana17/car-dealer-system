import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { User } from '../users/entities/user.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale) private readonly salesRepo: Repository<Sale>,
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Customer) private readonly customers: Repository<Customer>,
    @InjectRepository(Vehicle) private readonly vehicles: Repository<Vehicle>,
  ) {}

  async create(dto: CreateSaleDto) {
    // Si tus IDs son UUID (string), no hace falta castear
    const user = await this.users.findOneByOrFail({ id: dto.userId as any });
    const customer = await this.customers.findOneByOrFail({ id: dto.customerId as any });
    const vehicle = await this.vehicles.findOneByOrFail({ id: dto.vehicleId as any });

    const sale = this.salesRepo.create({
      total: dto.total,
      notes: dto.notes,
      user,
      customer,
      vehicle,
    });

    return this.salesRepo.save(sale);
  }

  findAll() {
    return this.salesRepo.find({ order: { date: 'DESC' } });
  }

  // ⬇️ id como string (UUID) para empatar con tu SalesController
  async findOne(id: string) {
    const s = await this.salesRepo.findOne({ where: { id } });
    if (!s) throw new NotFoundException('Sale not found');
    return s;
  }

  // ⬇️ id como string (UUID)
  async update(id: string, dto: UpdateSaleDto) {
    const s = await this.findOne(id);

    if (dto.userId) {
      s.user = await this.users.findOneByOrFail({ id: dto.userId as any });
    }
    if (dto.customerId) {
      s.customer = await this.customers.findOneByOrFail({ id: dto.customerId as any });
    }
    if (dto.vehicleId) {
      s.vehicle = await this.vehicles.findOneByOrFail({ id: dto.vehicleId as any });
    }
    if (dto.total !== undefined) s.total = dto.total;
    if (dto.notes !== undefined) s.notes = dto.notes;

    return this.salesRepo.save(s);
  }

  // ⬇️ id como string (UUID)
  async remove(id: string) {
    const s = await this.findOne(id);
    await this.salesRepo.remove(s);
    return { deleted: true };
  }
}
