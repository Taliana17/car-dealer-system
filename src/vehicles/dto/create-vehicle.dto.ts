// Importa los decoradores de validación desde class-validator
import { IsString, IsNumber, IsUUID, IsOptional, IsIn, IsArray } from 'class-validator';

// DTO (Data Transfer Object) para crear un nuevo vehículo
// Define las reglas de validación para los datos que llegan al backend
export class CreateVehicleDto {
  @IsString() vin: string;
  @IsString() brand: string;
  @IsString() model: string;

  @IsNumber() year: number;
  @IsNumber() price: number;

  @IsUUID() categoryId: string;

  @IsArray() @IsUUID('4', { each: true }) @IsOptional()
  featureIds?: string[];

  // NUEVO: asignar cliente opcionalmente
  @IsUUID() @IsOptional()
  customerId?: string;

  @IsIn(['available', 'sold', 'reserved']) @IsOptional()
  status?: 'available' | 'sold' | 'reserved';
}

