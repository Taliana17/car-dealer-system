// Importa los módulos necesarios de NestJS y TypeORM
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Importa el servicio, controlador y entidades relacionadas con vehículos
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { Vehicle } from './entities/vehicle.entity';
import { Category } from '../categories/entities/category.entity';
import { Feature } from '../features/entities/feature.entity';
import { Customer } from '../customers/entities/customer.entity';

// Define el módulo de vehículos
@Module({
  // Importa los repositorios de las entidades necesarias para TypeORM
  imports: [TypeOrmModule.forFeature([Vehicle, Category, Feature, Customer])],

  // Controlador que maneja las rutas relacionadas con vehículos
  controllers: [VehiclesController],

  // Servicio que contiene la lógica de negocio de los vehículos
  providers: [VehiclesService],

  // Exporta el servicio para que pueda usarse en otros módulos si se necesita
  exports: [VehiclesService],
})
export class VehiclesModule {}

