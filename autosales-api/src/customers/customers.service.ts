import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly repo: Repository<Customer>,
  ) {}

  create(dto: CreateCustomerDto) {
    const c = this.repo.create(dto);
    return this.repo.save(c);
  }

  findAll() {
    return this.repo.find({ relations: ['vehicles', 'sales'] });
  }

  // ⬇️ id como string (UUID)
  async findOne(id: string) {
    const c = await this.repo.findOne({ where: { id }, relations: ['vehicles', 'sales'] });
    if (!c) throw new NotFoundException('Customer not found');
    return c;
  }

  // ⬇️ id como string (UUID)
  async update(id: string, dto: UpdateCustomerDto) {
    await this.repo.update({ id }, dto);
    return this.findOne(id);
  }

  // ⬇️ id como string (UUID)
  async remove(id: string) {
    await this.repo.delete({ id });
    return { deleted: true };
  }
}
