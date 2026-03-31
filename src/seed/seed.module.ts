import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BatchEntity } from 'src/entities/batch.entity';
import { CostsProductionEntity } from 'src/entities/costsProduction.entity';
import { InventoryEntity } from 'src/entities/inventory.entity';
import { ProfitabilityEntity } from 'src/entities/profitability.entity';
import { SalesEntity } from 'src/entities/sales.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { seedController } from './seed.controller';
import { seedService } from './seed.service';
import { seedRepository } from './seed.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UsersEntity,
            SalesEntity,
            ProfitabilityEntity,
            InventoryEntity,
            CostsProductionEntity,
            BatchEntity,
        ]),
    ],
    controllers: [seedController],
    providers: [seedService, seedRepository],
})
export class seedModule {}
