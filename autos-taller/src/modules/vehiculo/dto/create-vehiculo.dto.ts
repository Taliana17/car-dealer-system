// modules/vehiculo/dto/create-vehiculo.dto.ts
import { IsDateString, IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';
import { VehiculoEstado } from '../../../enums/enums';

export class CreateVehiculoDto {
  @IsNumberString() id_concesionario: string;
  @IsString() marca: string;
  @IsString() modelo: string;
  @IsOptional() @IsString() color?: string;
  @IsOptional() @IsNumberString() kilometraje?: string;
  @IsOptional() @IsEnum(VehiculoEstado) estado?: VehiculoEstado;
  @IsOptional() @IsDateString() fecha_ingreso?: string;
}
