// modules/detalle-venta/entities/detalle-venta.entity.ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Venta } from '../../venta/entities/venta.entity';
import { Vehiculo } from '../../vehiculo/entities/vehiculo.entity';

@Entity()
@Unique(['venta', 'vehiculo'])
export class DetalleVenta {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(() => Venta, v => v.detalles, { onDelete: 'CASCADE' }) venta: Venta;
  @ManyToOne(() => Vehiculo, v => v.detalles, { onDelete: 'RESTRICT' }) vehiculo: Vehiculo;

  @Column('decimal', { precision: 12, scale: 2 }) precio_unitario: string;
}
