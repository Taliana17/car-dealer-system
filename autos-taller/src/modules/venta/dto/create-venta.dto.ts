import {
  ArrayMinSize,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MetodoPago } from '../../../enums/enums'; 

class DetalleDto {
  @IsNumber()
  id_vehiculo: number;

  @IsNumber()
  @Min(0)
  precio_unitario: number;
}

export class CreateVentaDto {
  @IsNumber()
  id_cliente: number;

  @IsNumber()
  id_concesionario: number;

  @IsNumber()
  id_empleado: number;

  @IsString()
  numero_factura: string;

  @IsDateString()
  fecha_venta: string;

  @IsEnum(MetodoPago)
  metodo_pago: MetodoPago;

  @IsNumber()
  @IsOptional()
  descuento_porcentaje?: number;

  @IsNumber()
  @IsOptional()
  impuestos?: number;

  @IsString()
  @IsOptional()
  notas?: string;

  @ValidateNested({ each: true })
  @Type(() => DetalleDto)
  @ArrayMinSize(1)
  detalles: DetalleDto[];
}
