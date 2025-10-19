
// modules/concesionario/entities/concesionario.entity.ts
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Empleado } from '../../empleado/entities/empleado.entity';
import { Vehiculo } from '../../vehiculo/entities/vehiculo.entity';
import { Venta } from '../../venta/entities/venta.entity';

@Entity()
export class Concesionario {
  @PrimaryGeneratedColumn() id: number;

  @Column() nombre: string;
  @Column() direccion: string;
  @Column() numero_contacto: string;
  @Column({ nullable: true }) horario_atencion?: string;

  @ManyToOne(() => Empleado, { nullable: true })
  encargado?: Empleado;

  @OneToMany(() => Empleado, e => e.concesionario) empleados: Empleado[];
  @OneToMany(() => Vehiculo, v => v.concesionario) vehiculos: Vehiculo[];
  @OneToMany(() => Venta, v => v.concesionario) ventas: Venta[];
}
