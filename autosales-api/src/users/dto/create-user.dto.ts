import { IsEmail, IsString, MinLength, IsIn, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail() email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsIn(['admin', 'seller'])
  @IsOptional()
  role?: 'admin' | 'seller';
}
