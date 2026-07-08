import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    CreateDateColumn,
} from 'typeorm';

import { InventoryEntity } from './inventory.entity';
import { BatchEntity } from './batch.entity';
import { UsersEntity } from './users.entity';
import { MovementType } from '../enum/movementType.enum';

@Entity({ name: 'inventoryMovement' })
export class InventoryMovementEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
    })
    quantity!: number;

    @Column({
        type: 'enum',
        enum: MovementType,
    })
    movementType!: MovementType;

    @Column({
        type: 'varchar',
        length: 300,
        nullable: true,
    })
    description!: string;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt!: Date;

    @ManyToOne(
        () => InventoryEntity,
        (inventory) => inventory.inventoryMovement,
    )
    @JoinColumn()
    inventory!: InventoryEntity;

    @ManyToOne(() => BatchEntity, (batch) => batch.inventoryMovement)
    @JoinColumn()
    batch!: BatchEntity;

    @ManyToOne(() => UsersEntity, (users) => users.inventoryMovement)
    @JoinColumn()
    users!: UsersEntity;
}
