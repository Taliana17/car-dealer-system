import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concesionario } from './entities/concesionario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Concesionario])],
  controllers: [/* ConcesionarioController */],
  providers: [/* ConcesionarioService */],
  exports: [TypeOrmModule],
})
export class ConcesionarioModule {}
