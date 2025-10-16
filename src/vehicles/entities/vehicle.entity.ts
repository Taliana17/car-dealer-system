// Importa los decoradores y tipos necesarios desde TypeORM
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

// Importa las entidades relacionadas
import { Category } from '../../categories/entities/category.entity';
import { Feature } from '../../features/entities/feature.entity';
import { Sale } from '../../sales/entities/sale.entity';
import { Customer } from '../../customers/entities/customer.entity';

// Marca esta clase como una entidad llamada "vehicles" en la base de datos
@Entity('vehicles')

// Define que el campo VIN debe ser único (no se puede repetir)
@Unique(['vin'])
export class Vehicle {
  // ID único generado automáticamente (UUID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Número de identificación del vehículo
  @Column()
  vin: string;

  // Marca del vehículo (por ejemplo, Toyota)
  @Column()
  brand: string;

  // Modelo del vehículo (por ejemplo, Corolla)
  @Column()
  model: string;

  // Año de fabricación (entero)
  @Column('int')
  year: number;

  // Precio con formato decimal (hasta 12 dígitos y 2 decimales)
  @Column('decimal', { precision: 12, scale: 2 })
  price: number;

  // Estado del vehículo (disponible, vendido o reservado)
  @Column({ default: 'available' })
  status: 'available' | 'sold' | 'reserved';

  // Relación muchos-a-uno con categoría (cada vehículo pertenece a una categoría)
  @ManyToOne(() => Category, c => c.vehicles, { eager: true })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  // Relación muchos-a-muchos con características (features)
  // Usa una tabla intermedia llamada "vehicle_features"
  @ManyToMany(() => Feature, f => f.vehicles, { eager: true })
  @JoinTable({ name: 'vehicle_features' })
  features: Feature[];

  // Relación uno-a-muchos con ventas (un vehículo puede tener muchas ventas registradas)
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

