// modules/cliente/entities/cliente.entity.ts
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ClienteTipo } from '../../../enums/enums';
import { Venta } from '../../venta/entities/venta.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn() id: number;

  @Column() nombre: string;
  @Column() apellido: string;
  @Column({ nullable: true }) telefono?: string;
  @Column({ unique: true }) email: string;
  @Column({ nullable: true }) direccion?: string;
  @Column({ type: 'enum', enum: ClienteTipo }) tipo_cliente: ClienteTipo;

  @OneToMany(() => Venta, v => v.cliente) ventas: Venta[];
}
