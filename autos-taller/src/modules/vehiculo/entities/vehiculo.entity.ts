// modules/vehiculo/entities/vehiculo.entity.ts
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VehiculoEstado } from '../../../enums/enums';
import { Concesionario } from '../../concesionario/entities/concesionario.entity';
import { DetalleVenta } from '../../detalle-venta/entities/detalle-venta.entity';
import { ServicioTecnico } from '../../servicio-tecnico/entities/servicio-tecnico.entity';

@Entity()
export class Vehiculo {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(() => Concesionario, c => c.vehiculos, { nullable: false })
  concesionario: Concesionario;

  @Column() marca: string;
  @Column() modelo: string;
  @Column({ nullable: true }) color?: string;
  @Column('decimal', { precision: 10, scale: 2, default: 0 }) kilometraje: string;
  @Column({ type: 'enum', enum: VehiculoEstado, default: VehiculoEstado.disponible })
  estado: VehiculoEstado;
  @Column({ type: 'date', default: () => 'CURRENT_DATE' }) fecha_ingreso: string;

  @OneToMany(() => DetalleVenta, d => d.vehiculo) detalles: DetalleVenta[];
  @OneToMany(() => ServicioTecnico, s => s.vehiculo) servicios: ServicioTecnico[];
}
