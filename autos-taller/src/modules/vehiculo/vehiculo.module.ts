import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehiculo } from './entities/vehiculo.entity';
import { Concesionario } from '../concesionario/entities/concesionario.entity';
import { ServicioTecnico } from '../servicio-tecnico/entities/servicio-tecnico.entity';

@Module({
  imports: [
    // 👇 incluye también ServicioTecnico; así no dependes del orden de carga
    TypeOrmModule.forFeature([Vehiculo, Concesionario, ServicioTecnico]),
  ],
  controllers: [/* VehiculoController */],
  providers: [/* VehiculoService */],
  exports: [TypeOrmModule],
})
export class VehiculoModule {}
