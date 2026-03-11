import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';
import { BatchEntity } from './batch.entity';

@Entity({ name: 'costs_production' })
export class CostsProductionEntity {
  // aqui iran las columnas de la tabla costs_production\

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'date',
    name: 'cost_date',
    nullable: false,
  })
  costDate: Date;

  @Column({
    type: 'text',
    length: 500,
    nullable: false,
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  costType: string;

  @Column({
    type: 'varchar',
    length: 40,
    nullable: false,
  })
  unit: string;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  worth: number;

  @ManyToOne(() => UsersEntity, (users) => users.costProduction)
  @JoinColumn()
  users: UsersEntity;

  @ManyToOne(() => BatchEntity, (batch) => batch.costProduction)
  @JoinColumn()
  batch: BatchEntity;
}
