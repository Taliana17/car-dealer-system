import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Vehiculo } from '../../vehiculo/entities/vehiculo.entity';
import { Empleado } from '../../empleado/entities/empleado.entity';
import { ServicioEstado } from '../../../enums/enums';

@Entity()
export class ServicioTecnico {
  @PrimaryGeneratedColumn()
  id_servicio: number;

  @ManyToOne(() => Vehiculo, (v) => v.servicios, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_vehiculo' })
  vehiculo: Vehiculo;

  @ManyToOne(() => Empleado, { nullable: false })
  @JoinColumn({ name: 'id_empleado' })
  empleado: Empleado; // técnico/mecánico

  @Column()
  tipo_servicio: string; // mantenimiento, reparación, revisión...

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha_servicio: Date;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  costo: number;

  @Column({ type: 'enum', enum: ServicioEstado, default: ServicioEstado.pendiente })
  estado: ServicioEstado;
}
