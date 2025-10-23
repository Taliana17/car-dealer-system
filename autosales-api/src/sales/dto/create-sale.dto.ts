import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSaleDto {
  @IsInt() @Type(() => Number) userId: number;       // si userId es numérico en tu modelo
  @IsInt() @Type(() => Number) customerId: number;   // 👈 numérico
  @IsInt() @Type(() => Number) vehicleId: number;    // si vehicleId es numérico
  @IsNumber() @Type(() => Number) total: number;

  @IsOptional() @IsString()
  notes?: string;
}
