import {
  IsEmail,
  IsString,
  MinLength,
  IsEnum,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { EmpleadoCargo } from '../../enums/enums';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  // Datos del empleado
  @IsString()
  nombre_empleado: string;

  @IsNumber()
  id_concesionario: number;

  @IsEnum(EmpleadoCargo)
  cargo: EmpleadoCargo;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  fecha_nacimiento?: string;

  @IsOptional()
  @IsNumber()
  salario?: number;
}
