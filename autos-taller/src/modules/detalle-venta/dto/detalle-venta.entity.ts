import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  JoinColumn,
} from 'typeorm';
import { Venta } from '../../venta/entities/venta.entity';
import { Vehiculo } from '../../vehiculo/entities/vehiculo.entity';

@Entity()
@Unique(['venta', 'vehiculo'])
export class DetalleVenta {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Venta, (venta) => venta.detalles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_venta' })
  venta: Venta;

  @ManyToOne(() => Vehiculo, (vehiculo) => vehiculo.detalles, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_vehiculo' })
  vehiculo: Vehiculo;

  @Column('decimal', { precision: 12, scale: 2 })
  precio_unitario: number;
}
