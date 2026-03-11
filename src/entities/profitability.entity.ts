import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';
import { BatchEntity } from './batch.entity';

@Entity({ name: 'profitability' })
export class ProfitabilityEntity {
  // aqui iran las columnas de la tabla profitability

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'date',
    name: 'start_date',
    nullable: false,
  })
  startDate: Date;

  @Column({
    type: 'date',
    name: 'end_date',
    nullable: false,
  })
  endDate: Date;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  totalIncome: number;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  totalCost: number;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  netProfit: number;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  profitPercentage: number;

  @ManyToOne(() => UsersEntity, (users) => users.profitabilite)
  @JoinColumn()
  users: UsersEntity;

  @OneToOne(() => BatchEntity, (batch) => batch.profitabilite)
  @JoinColumn()
  batch: BatchEntity;
}
