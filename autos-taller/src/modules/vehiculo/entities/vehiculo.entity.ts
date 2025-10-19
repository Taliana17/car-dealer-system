import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { VehiculoEstado } from '../../../enums/enums';
import { Concesionario } from '../../concesionario/entities/concesionario.entity';
import { DetalleVenta } from '../../detalle-venta/entities/detalle-venta.entity';
import { ServicioTecnico } from '../../servicio-tecnico/entities/servicio-tecnico.entity';

@Entity()
export class Vehiculo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Concesionario, (c) => c.vehiculos, { nullable: false })
  @JoinColumn({ name: 'id_concesionario' })
  concesionario: Concesionario;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @Column({ nullable: true })
  color?: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  kilometraje: number;

  @Column({ type: 'enum', enum: VehiculoEstado, default: VehiculoEstado.disponible })
  estado: VehiculoEstado;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha_ingreso: Date;

  @OneToMany(() => DetalleVenta, (d) => d.vehiculo)
  detalles: DetalleVenta[];

  // 👇 Esta relación exige que ServicioTecnico exista y esté registrado en TypeORM
  @OneToMany(() => ServicioTecnico, (s) => s.vehiculo)
  servicios: ServicioTecnico[];
}
