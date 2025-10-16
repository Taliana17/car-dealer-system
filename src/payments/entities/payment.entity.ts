import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Sale } from '../../sales/entities/sale.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;

  // 👇 extiende el union para incluir "loan" (crédito)
  @Column({ type: 'varchar' })
  method: 'cash' | 'card' | 'transfer' | 'loan';

  // 👇 si quieres manejar estado, añade la columna
  @Column({ type: 'varchar', default: 'confirmed' })
  status: 'confirmed' | 'pending' | 'failed';

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @ManyToOne(() => Sale, sale => sale.payments, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'saleId' })
  sale: Sale;
}
