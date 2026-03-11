import { StateEnum } from 'src/enum/state.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';
import { BatchEntity } from './batch.entity';

@Entity({ name: 'inventory' })
export class InventoryEntity {
  // aqui iran las columnas de la tabla inventory

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'date',
    name: 'registration_date',
    nullable: false,
  })
  registrationDate: Date;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  product: string;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  amount: number;

  @Column({
    type: 'varchar',
    length: 40,
    nullable: false,
  })
  unit: string;

  @Column({
    type: 'enum',
    enum: StateEnum,
    default: StateEnum.IN_STOCK,
  })
  state: StateEnum;

  @ManyToOne(() => UsersEntity, (users) => users.inventory)
  @JoinColumn()
  users: UsersEntity;

  @ManyToOne(() => BatchEntity, (batch) => batch.inventory)
  @JoinColumn()
  batch: BatchEntity;
}
