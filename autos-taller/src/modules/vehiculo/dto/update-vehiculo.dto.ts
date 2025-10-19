// modules/vehiculo/dto/update-vehiculo.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateVehiculoDto } from './create-vehiculo.dto';
export class UpdateVehiculoDto extends PartialType(CreateVehiculoDto) {}
