import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BatchEntity } from 'src/entities/batch.entity';
import { CostsProductionEntity } from 'src/entities/costsProduction.entity';
import { InventoryEntity } from 'src/entities/inventory.entity';
import { ProfitabilityEntity } from 'src/entities/profitability.entity';
import { SalesEntity } from 'src/entities/sales.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { RolesEnum } from 'src/enum/roles.enum';
import { Repository } from 'typeorm';

@Injectable()
export class seedRepository {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersDataBase: Repository<UsersEntity>,

        @InjectRepository(SalesEntity)
        private readonly salesDataBase: Repository<SalesEntity>,

        @InjectRepository(ProfitabilityEntity)
        private readonly profitabilityDataBase: Repository<ProfitabilityEntity>,

        @InjectRepository(InventoryEntity)
        private readonly inventoryDataBase: Repository<InventoryEntity>,

        @InjectRepository(CostsProductionEntity)
        private readonly costsProductionDataBase: Repository<CostsProductionEntity>,

        @InjectRepository(BatchEntity)
        private readonly batchDataBase: Repository<BatchEntity>,
    ) {}

    async getSeedUsersRepository() {
        const contador = await this.usersDataBase.count();
        if (contador !== 0) {
            throw new ConflictException(
                'La base de datos ya contiene usuarios',
            );
        }

        await this.usersDataBase.save([
            {
                fullName: 'Angy Ariza',
                email: 'angyzpao@gmail.com',
                password: 'Angy1012',
                roles: RolesEnum.ADMIN,
            },
        ]);
        return { message: 'usuario creado con exito' };
    }
}
