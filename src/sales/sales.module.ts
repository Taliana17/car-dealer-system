import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Sale } from './entities/sale.entity';
import { User } from '../users/entities/user.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, User, Customer, Vehicle])], // 👈 NECESARIO
  controllers: [SalesController],
  providers: [SalesService],
  exports: [TypeOrmModule, SalesService],
})
export class SalesModule {}
