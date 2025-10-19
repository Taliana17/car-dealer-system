import { PartialType } from '@nestjs/mapped-types';
import { CreateServicioTecnicoDto } from './create-servicio-tecnico.dto';

export class UpdateServicioTecnicoDto extends PartialType(CreateServicioTecnicoDto) {}
