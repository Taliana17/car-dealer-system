import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Concesionario } from '../../concesionario/entities/concesionario.entity';
import { Empleado } from '../../empleado/entities/empleado.entity';
import { DetalleVenta } from '../../detalle-venta/entities/detalle-venta.entity';
import { MetodoPago } from '../../../enums/enums';

@Entity()
export class Venta {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, (c) => c.ventas, { nullable: false })
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @ManyToOne(() => Concesionario, (c) => c.ventas, { nullable: false })
  @JoinColumn({ name: 'id_concesionario' })
  concesionario: Concesionario;

  @ManyToOne(() => Empleado, (e) => e.ventas, { nullable: false })
  @JoinColumn({ name: 'id_empleado' })
  empleado: Empleado;

  @Column({ unique: true })
  numero_factura: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha_venta: Date;

  @Column({ type: 'enum', enum: MetodoPago })
  metodo_pago: MetodoPago;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  descuento_porcentaje: number;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  impuestos: number;

  @Column({ type: 'text', nullable: true })
  notas?: string;

  @OneToMany(() => DetalleVenta, (d) => d.venta, { cascade: true })
  detalles: DetalleVenta[];
}
