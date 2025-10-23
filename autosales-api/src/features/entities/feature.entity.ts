import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Unique } from 'typeorm';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';

@Entity('features')
@Unique(['name'])
export class Feature {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Vehicle, v => v.features)
  vehicles: Vehicle[];
}
