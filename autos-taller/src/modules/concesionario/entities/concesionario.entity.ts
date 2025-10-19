
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Empleado } from '../../empleado/entities/empleado.entity';
import { Vehiculo } from '../../vehiculo/entities/vehiculo.entity';
import { Venta } from '../../venta/entities/venta.entity';

@Entity()
export class Concesionario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  // si aún no manejas encargado, puedes dejarlo opcional o quitarlo
  @ManyToOne(() => Empleado, { nullable: true })
  @JoinColumn({ name: 'encargado' })
  encargado?: Empleado;

  @Column({ nullable: true })
  numero_contacto?: string;

  @Column({ nullable: true })
  horario_atencion?: string;

  @OneToMany(() => Empleado, (e) => e.concesionario)
  empleados: Empleado[];

  @OneToMany(() => Vehiculo, (v) => v.concesionario)
  vehiculos: Vehiculo[];

  @OneToMany(() => Venta, (v) => v.concesionario)
  ventas: Venta[];
}
