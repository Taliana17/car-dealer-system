import { Module } from '@nestjs/common';
import { ServicioTecnicoService } from './servicio-tecnico.service';
import { ServicioTecnicoController } from './servicio-tecnico.controller';

@Module({
  controllers: [ServicioTecnicoController],
  providers: [ServicioTecnicoService],
})
export class ServicioTecnicoModule {}
