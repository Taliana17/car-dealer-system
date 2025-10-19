import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioTecnico } from './entities/servicio-tecnico.entity';
import { Vehiculo } from '../vehiculo/entities/vehiculo.entity';
import { Empleado } from '../empleado/entities/empleado.entity';

@Module({
  imports: [
    // 👈 registrar ServicioTecnico aquí es lo que habilita su metadata
    TypeOrmModule.forFeature([ServicioTecnico, Vehiculo, Empleado]),
  ],
  controllers: [/* ServicioTecnicoController si lo tienes */],
  providers: [/* ServicioTecnicoService si lo tienes */],
  exports: [TypeOrmModule],
})
export class ServicioTecnicoModule {}
