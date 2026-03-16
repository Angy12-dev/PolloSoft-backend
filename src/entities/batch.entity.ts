import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';
import { SalesEntity } from './sales.entity';
import { InventoryEntity } from './inventory.entity';
import { ProfitabilityEntity } from './profitability.entity';
import { CostsProductionEntity } from './costsProduction.entity';

@Entity({ name: 'batch' })
export class BatchEntity {
  // aqui iran las columnas de la tabla batch

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  lotNumber: string;

  @Column({
    type: 'date',
    name: 'entry_date',
    nullable: false,
  })
  entryDate: Date;

  @Column({
    type: 'int',
    nullable: false,
  })
  initialAmount: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  supplier: string;

  @Column({
    type: 'date',
    name: 'departure_date',
    nullable: false,
  })
  departureDate: Date;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  description: string;

  @ManyToOne(() => UsersEntity, (users) => users.batch)
  @JoinColumn()
  users: BatchEntity;

  @OneToMany(() => SalesEntity, (sales) => sales.batch)
  sales: SalesEntity;

  @OneToMany(() => InventoryEntity, (inventory) => inventory.batch)
  inventory: InventoryEntity;

  @OneToOne(() => ProfitabilityEntity, (profitabilite) => profitabilite.batch)
  profitabilite: ProfitabilityEntity;

  @OneToMany(
    () => CostsProductionEntity,
    (costProduction) => costProduction.batch,
  )
  costProduction: CostsProductionEntity;
}
