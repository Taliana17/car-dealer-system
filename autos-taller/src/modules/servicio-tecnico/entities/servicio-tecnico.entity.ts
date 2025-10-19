// modules/servicio-tecnico/entities/servicio-tecnico.entity.ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ServicioEstado } from '../../../enums/enums';
import { Vehiculo } from '../../vehiculo/entities/vehiculo.entity';
import { Empleado } from '../../empleado/entities/empleado.entity';

@Entity()
export class ServicioTecnico {
  @PrimaryGeneratedColumn() id_servicio: number;

  @ManyToOne(() => Vehiculo, v => v.servicios, { nullable: false, onDelete: 'CASCADE' })
  vehiculo: Vehiculo;

  @ManyToOne(() => Empleado, e => e.servicios, { nullable: false })
  empleado: Empleado;

  @Column() tipo_servicio: string;
  @Column({ type: 'date', default: () => 'CURRENT_DATE' }) fecha_servicio: string;
  @Column('decimal', { precision: 12, scale: 2 }) costo: string;
  @Column({ type: 'enum', enum: ServicioEstado, default: ServicioEstado.pendiente }) estado: ServicioEstado;
}
