// modules/empleado/entities/empleado.entity.ts
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmpleadoCargo } from '../../../enums/enums';
import { Concesionario } from '../../concesionario/entities/concesionario.entity';
import { Venta } from '../../venta/entities/venta.entity';
import { ServicioTecnico } from '../../servicio-tecnico/entities/servicio-tecnico.entity';

@Entity()
export class Empleado {
  @PrimaryGeneratedColumn() id: number;

  @Column() nombre_empleado: string;

  @ManyToOne(() => Concesionario, c => c.empleados, { nullable: false })
  concesionario: Concesionario;

  @Column({ type: 'enum', enum: EmpleadoCargo }) cargo: EmpleadoCargo;

  @Column({ nullable: true }) telefono?: string;
  @Column({ type: 'date', nullable: true }) fecha_nacimiento?: string;
  @Column({ nullable: true, unique: true }) email?: string;
  @Column('decimal', { precision: 12, scale: 2 }) salario: string;

  @Column({ select: false, nullable: true }) passwordHash?: string;

  @OneToMany(() => Venta, v => v.empleado) ventas: Venta[];
  @OneToMany(() => ServicioTecnico, s => s.empleado) servicios: ServicioTecnico[];
}
