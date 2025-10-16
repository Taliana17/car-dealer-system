// Importa el helper PartialType desde @nestjs/mapped-types.
// Este helper permite crear un nuevo DTO basado en otro,
// haciendo que todas las propiedades sean opcionales (ideal para actualizaciones).
import { PartialType } from '@nestjs/mapped-types';

// Importa el DTO original usado para crear vehículos.
// Servirá como base para generar el DTO de actualización.
import { CreateVehicleDto } from './create-vehicle.dto';

// Importa los decoradores de validación para asegurar que los datos recibidos
// cumplan con las reglas esperadas (en este caso, que sea UUID y opcional).
import { IsUUID, IsOptional } from 'class-validator';

// Define el DTO (Data Transfer Object) para actualizar un vehículo.
// Hereda de PartialType(CreateVehicleDto), lo que convierte
// todas las propiedades del CreateVehicleDto en opcionales automáticamente.
export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {

  // Campo adicional explícito para el ID del cliente asociado al vehículo.
  // @IsUUID() valida que el valor tenga el formato correcto de UUID.
  // @IsOptional() indica que este campo no es obligatorio en la actualización.
  // El comentario recuerda que PartialType ya lo hace opcional, pero aquí se deja explícito.
  @IsUUID()
  @IsOptional()
  customerId?: string;
}

