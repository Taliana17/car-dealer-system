import { IsUUID, IsNumber, IsIn, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @IsUUID() saleId: string;

  @IsNumber() amount: number;

  @IsIn(['cash', 'card', 'transfer', 'loan'])
  method: 'cash' | 'card' | 'transfer' | 'loan';

  @IsIn(['confirmed', 'pending', 'failed'])
  @IsOptional()
  status?: 'confirmed' | 'pending' | 'failed';
}
