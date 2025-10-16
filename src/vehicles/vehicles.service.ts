// Importa decoradores y excepciones de NestJS
import { Injectable, NotFoundException } from '@nestjs/common';

// Importa herramientas de TypeORM para usar repositorios
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

// Importa las entidades relacionadas
import { Vehicle } from './entities/vehicle.entity';
import { Category } from '../categories/entities/category.entity';
import { Feature } from '../features/entities/feature.entity';
import { Customer } from '../customers/entities/customer.entity';

// Importa los DTOs de creación y actualización
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

// Marca esta clase como inyectable (puede ser usada en otros módulos)
@Injectable()
export class VehiclesService {
  // Inyecta los repositorios de las entidades
  constructor(
    @InjectRepository(Vehicle) private readonly repo: Repository<Vehicle>,
    @InjectRepository(Category) private readonly catRepo: Repository<Category>,
    @InjectRepository(Feature) private readonly featRepo: Repository<Feature>,
    @InjectRepository(Customer) private readonly custRepo: Repository<Customer>,
  ) {}

  // Crea un nuevo vehículo en la base de datos
  async create(dto: CreateVehicleDto) {
    // Busca la categoría asociada
    const category = await this.catRepo.findOneByOrFail({ id: dto.categoryId });

    // Busca las características si existen
    const features = dto.featureIds?.length
      ? await this.featRepo.findBy({ id: In(dto.featureIds) })
      : [];

    // Busca el cliente si se proporcionó
    const customer = dto.customerId
      ? await this.custRepo.findOneByOrFail({ id: dto.customerId })
      : null;

    // Crea una nueva instancia de vehículo
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

    // Guarda el vehículo en la base de datos
    return this.repo.save(v);
  }

  // Obtiene todos los vehículos
  findAll() {
    // Si dejaste eager: true en customer, no necesitas relations.
    return this.repo.find();
  }

  // Busca un vehículo por su ID
  async findOne(id: string) {
    const v = await this.repo.findOne({ where: { id } });
    if (!v) throw new NotFoundException('Vehicle not found');
    return v;
  }

  // Actualiza un vehículo existente
  async update(id: string, dto: UpdateVehicleDto) {
    const v = await this.findOne(id);

    // Actualiza la categoría si llega un nuevo ID
    if (dto.categoryId) {
      v.category = await this.catRepo.findOneByOrFail({ id: dto.categoryId });
    }

    // Actualiza las características si llegan IDs nuevos
    if (dto.featureIds) {
      v.features = await this.featRepo.findBy({ id: In(dto.featureIds) });
    }

    // Actualiza o desasigna el cliente
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

    // Guarda los cambios
    return this.repo.save(v);
  }

  // Elimina un vehículo por su ID
  async remove(id: string) {
    const v = await this.findOne(id);
    await this.repo.remove(v);
    return { deleted: true };
  }
}

