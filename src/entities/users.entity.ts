import { RolesEnum } from 'src/enum/roles.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SalesEntity } from './sales.entity';
import { InventoryEntity } from './inventory.entity';
import { BatchEntity } from './batch.entity';
import { ProfitabilityEntity } from './profitability.entity';
import { CostsProductionEntity } from './costsProduction.entity';

@Entity({ name: 'users' })
export class UsersEntity {
    // aqui iran las columnas de la tabla users

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    fullName: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    password: string;

    @Column({
        type: 'enum',
        enum: RolesEnum,
        default: RolesEnum.ADMIN,
    })
    roles: RolesEnum;

    @Column({
        type: 'boolean',
        default: true,
    })
    isActive: boolean;

    @OneToMany(() => SalesEntity, (sales) => sales.users)
    sales: SalesEntity[];

    @OneToMany(() => InventoryEntity, (inventory) => inventory.users)
    inventory: InventoryEntity;

    @OneToMany(() => BatchEntity, (batch) => batch.users)
    batch: BatchEntity;

    @OneToMany(
        () => ProfitabilityEntity,
        (profitabilite) => profitabilite.users,
    )
    profitabilite: ProfitabilityEntity;

    @OneToMany(
        () => CostsProductionEntity,
        (costProduction) => costProduction.users,
    )
    costProduction: CostsProductionEntity;
}
