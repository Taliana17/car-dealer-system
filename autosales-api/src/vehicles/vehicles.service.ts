import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Category } from '../categories/entities/category.entity';
import { Feature } from '../features/entities/feature.entity';
import { Customer } from '../customers/entities/customer.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle) private readonly repo: Repository<Vehicle>,
    @InjectRepository(Category) private readonly catRepo: Repository<Category>,
    @InjectRepository(Feature) private readonly featRepo: Repository<Feature>,
    @InjectRepository(Customer) private readonly custRepo: Repository<Customer>,
  ) {}

  async create(dto: CreateVehicleDto) {
    const category = await this.catRepo.findOneByOrFail({ id: dto.categoryId });
    const features = dto.featureIds?.length
      ? await this.featRepo.findBy({ id: In(dto.featureIds) })
      : [];

    const customer = dto.customerId
      ? await this.custRepo.findOneByOrFail({ id: dto.customerId })
      : null;

    const v = this.repo.create({
      vin: dto.vin,
      brand: dto.brand,
      model: dto.model,
      year: dto.year,
      price: dto.price,
      status: dto.status ?? 'available',
      category,
      features,
      customer,
    });

    return this.repo.save(v);
  }

  findAll() {
    // Si dejaste eager: true en customer, no necesitas relations.
    return this.repo.find();
  }

  async findOne(id: string) {
    const v = await this.repo.findOne({ where: { id } });
    if (!v) throw new NotFoundException('Vehicle not found');
    return v;
  }

  async update(id: string, dto: UpdateVehicleDto) {
    const v = await this.findOne(id);

    if (dto.categoryId) {
      v.category = await this.catRepo.findOneByOrFail({ id: dto.categoryId });
    }

    if (dto.featureIds) {
      v.features = await this.featRepo.findBy({ id: In(dto.featureIds) });
    }

    if (dto.customerId !== undefined) {
      v.customer = dto.customerId
        ? await this.custRepo.findOneByOrFail({ id: dto.customerId })
        : null; // permite desasignar
    }

    // Asigna valores primitivos si llegan
    if (dto.vin !== undefined) v.vin = dto.vin;
    if (dto.brand !== undefined) v.brand = dto.brand;
    if (dto.model !== undefined) v.model = dto.model;
    if (dto.year !== undefined) v.year = dto.year;
    if (dto.price !== undefined) v.price = dto.price;
    if (dto.status !== undefined) v.status = dto.status;

    return this.repo.save(v);
  }

  async remove(id: string) {
    const v = await this.findOne(id);
    await this.repo.remove(v);
    return { deleted: true };
  }
}
