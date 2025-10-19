import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Venta } from './entities/venta.entity';
import { DetalleVenta } from '../detalle-venta/entities/detalle-venta.entity';
import { Vehiculo } from '../vehiculo/entities/vehiculo.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Concesionario } from '../concesionario/entities/concesionario.entity';
import { Empleado } from '../empleado/entities/empleado.entity';

import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Venta,
      DetalleVenta,
      Vehiculo,
      Cliente,
      Concesionario,
      Empleado,
    ]),
  ],
  controllers: [VentaController],
  providers: [VentaService],
  exports: [VentaService],
})
export class VentaModule {}
