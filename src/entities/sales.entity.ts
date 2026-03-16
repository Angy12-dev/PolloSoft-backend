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
    uuid: string;

    @Column({
        type: 'date',
        name: 'sale_date',
        nullable: false,
    })
    saledate: Date;

    @Column({
        type: 'int',
        nullable: false,
    })
    amount: number;

    @Column({
        type: 'decimal',
        nullable: false,
    })
    weight: number;

    @Column({
        type: 'decimal',
        nullable: false,
    })
    unitValue: number;

    @Column({
        type: 'decimal',
        nullable: false,
    })
    totalValue: number;

    @ManyToOne(() => UsersEntity, (users) => users.sales)
    @JoinColumn()
    users: UsersEntity;

    @ManyToOne(() => BatchEntity, (batch) => batch.sales)
    @JoinColumn()
    batch: BatchEntity;
}
