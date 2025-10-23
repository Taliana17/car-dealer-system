import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';

@Entity('categories')
@Unique(['name'])
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // inversa hacia Vehicle
  @OneToMany(() => Vehicle, v => v.category)
  vehicles: Vehicle[];
}
