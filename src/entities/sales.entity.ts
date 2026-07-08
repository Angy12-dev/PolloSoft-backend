import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';
import { BatchEntity } from './batch.entity';

@Entity({ name: 'sales' })
export class SalesEntity {
    // aqui iran las columnas de la tabla ventas

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        type: 'date',
        name: 'sale_date',
        nullable: false,
    })
    saleDate!: Date;

    @Column({
        type: 'int',
        nullable: false,
    })
    amount!: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        name: 'weight',
        nullable: false,
    })
    weightKg!: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
    })
    unitValue!: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
    })
    totalValue!: number;

    @ManyToOne(() => UsersEntity, (users) => users.sales)
    @JoinColumn()
    users!: UsersEntity;

    @ManyToOne(() => BatchEntity, (batch) => batch.sales)
    @JoinColumn()
    batch!: BatchEntity;
}
