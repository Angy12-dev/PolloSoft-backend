import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';
import { BatchEntity } from './batch.entity';

@Entity({ name: 'costsProduction' })
export class CostsProductionEntity {
    // aqui iran las columnas de la tabla costs_production\

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        type: 'date',
        name: 'costDate',
        nullable: false,
    })
    costDate!: Date;

    @Column({
        type: 'varchar',
        length: 500,
        nullable: false,
    })
    description!: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    costType!: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
    })
    amount!: number;

    @Column({
        type: 'decimal',
        nullable: false,
    })
    unitValue!: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
        name: 'totalValue',
    })
    totalValue!: number;

    @ManyToOne(() => UsersEntity, (users) => users.costProduction)
    users!: UsersEntity;

    @ManyToOne(() => BatchEntity, (batch) => batch.costProduction)
    @JoinColumn()
    batch!: BatchEntity;
}
