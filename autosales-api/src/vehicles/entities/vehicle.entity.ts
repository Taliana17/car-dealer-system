import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  Unique,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Feature } from '../../features/entities/feature.entity';
import { Sale } from '../../sales/entities/sale.entity';
import { Customer } from '../../customers/entities/customer.entity';

@Entity('vehicles')
@Unique(['vin'])
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  vin: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column('int')
  year: number;

  @Column('decimal', { precision: 12, scale: 2 })
  price: number;

  @Column({ default: 'available' })
  status: 'available' | 'sold' | 'reserved';

  @ManyToOne(() => Category, c => c.vehicles, { eager: true })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToMany(() => Feature, f => f.vehicles, { eager: true })
  @JoinTable({ name: 'vehicle_features' })
  features: Feature[];

  @OneToMany(() => Sale, s => s.vehicle)
  sales: Sale[];

  // NUEVA relación con cliente (opcional)
  @ManyToOne(() => Customer, customer => customer.vehicles, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: true, // ponlo en false si no quieres que siempre venga el customer
  })
  @JoinColumn({ name: 'customerId' })
  customer: Customer | null;
}
