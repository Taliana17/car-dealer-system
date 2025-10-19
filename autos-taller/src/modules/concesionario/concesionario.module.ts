import { Module } from '@nestjs/common';
import { ConcesionarioService } from './concesionario.service';
import { ConcesionarioController } from './concesionario.controller';

@Module({
  controllers: [ConcesionarioController],
  providers: [ConcesionarioService],
})
export class ConcesionarioModule {}
