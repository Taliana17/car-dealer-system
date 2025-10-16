import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Customer } from '../../customers/entities/customer.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { Payment } from '../../payments/entities/payment.entity';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string; // UUID

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column('decimal', { precision: 12, scale: 2 })
  total: number;

  @Column({ nullable: true })
  notes?: string;

  @ManyToOne(() => User, u => u.sales, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User; // UUID

  @ManyToOne(() => Customer, c => c.sales, { eager: true })
  @JoinColumn({ name: 'customerId' })
  customer: Customer; // UUID

  @ManyToOne(() => Vehicle, v => v.sales, { eager: true })
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle; // UUID

  @OneToMany(() => Payment, p => p.sale, { cascade: true })
  payments: Payment[];
}
