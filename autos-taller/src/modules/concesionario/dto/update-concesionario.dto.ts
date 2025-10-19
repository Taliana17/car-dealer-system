import { PartialType } from '@nestjs/mapped-types';
import { CreateConcesionarioDto } from './create-concesionario.dto';

export class UpdateConcesionarioDto extends PartialType(CreateConcesionarioDto) {}
