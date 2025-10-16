import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // Si deseas permitir cambio de contraseña:
  // password?: string (ya lo hereda y es opcional por PartialType)
}
