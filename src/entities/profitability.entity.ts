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
    id!: string;

    @Column({
        type: 'date',
        name: 'startDate',
        nullable: false,
    })
    startDate!: Date;

    @Column({
        type: 'date',
        name: 'endDate',
        nullable: true,
    })
    endDate!: Date | null;

    @Column({
        type: 'decimal',
        precision: 12,
        scale: 2,
        name: 'totalIncome',
        nullable: false,
    })
    totalIncome!: number;

    @Column({
        type: 'decimal',
        precision: 12,
        scale: 2,
        name: 'totalCost',
        nullable: false,
    })
    totalCost!: number;

    @Column({
        type: 'decimal',
        precision: 12,
        scale: 2,
        name: 'netProfit',
        nullable: false,
    })
    netProfit!: number;

    @Column({
        type: 'decimal',
        precision: 5,
        scale: 2,
        name: 'profitPercentage',
        nullable: false,
    })
    profitPercentage!: number;

    @ManyToOne(() => UsersEntity, (users) => users.profitability)
    users!: UsersEntity;

    @OneToOne(() => BatchEntity, (batch) => batch.profitability, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'batch_id' })
    batch!: BatchEntity;
}
