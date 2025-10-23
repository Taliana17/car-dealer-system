import { IsString, IsEmail } from 'class-validator';

export class CreateCustomerDto {
  @IsString() firstName: string;
  @IsString() lastName: string;
  @IsString() documentId: string;
  @IsString() phone: string;
  @IsEmail() email: string;
}
