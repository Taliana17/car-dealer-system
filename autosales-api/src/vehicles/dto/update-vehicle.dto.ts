import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleDto } from './create-vehicle.dto';
import { IsUUID, IsOptional } from 'class-validator';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {
  // explícito por si quieres verlo claro (PartialType ya lo haría opcional)
  @IsUUID() @IsOptional()
  customerId?: string;
}
