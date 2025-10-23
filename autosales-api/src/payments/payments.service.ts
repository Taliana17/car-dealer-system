import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Sale } from '../sales/entities/sale.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private repo: Repository<Payment>,
    @InjectRepository(Sale) private sales: Repository<Sale>,
  ) {}

  async create(dto: CreatePaymentDto) {
    const sale = await this.sales.findOneByOrFail({ id: dto.saleId });
    const p = this.repo.create({ ...dto, sale });
    return this.repo.save(p);
  }

  findAll() { return this.repo.find(); }

  async findOne(id: string) {
    const p = await this.repo.findOne({ where: { id } });
    if (!p) throw new NotFoundException('Payment not found');
    return p;
  }

  async update(id: string, dto: UpdatePaymentDto) {
    const p = await this.findOne(id);
    if (dto.saleId) p.sale = await this.sales.findOneByOrFail({ id: dto.saleId });
    Object.assign(p, dto);
    return this.repo.save(p);
  }

  async remove(id: string) {
    const p = await this.findOne(id);
    await this.repo.remove(p);
    return { deleted: true };
  }
}
