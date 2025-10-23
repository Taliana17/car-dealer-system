import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { Sale } from '../../sales/entities/sale.entity';

@Entity('users')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() email: string;

  @Column({ select: false }) passwordHash: string;

  @Column({ default: 'seller' }) role: 'admin' | 'seller';

  @OneToMany(() => Sale, sale => sale.user)
  sales: Sale[];
}
