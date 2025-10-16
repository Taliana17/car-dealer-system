import { IsString } from 'class-validator';

export class CreateFeatureDto {
  @IsString()
  name: string;
}
