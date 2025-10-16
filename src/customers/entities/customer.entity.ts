// src/customers/entities/customer.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sale } from '../../sales/entities/sale.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string; // <- UUID (string)

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  documentId: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @OneToMany(() => Sale, sale => sale.customer)
  sales: Sale[];

  @OneToMany(() => Vehicle, vehicle => vehicle.customer)
  vehicles: Vehicle[];
}
