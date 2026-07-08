import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostsProductionEntity } from '../entities/costsProduction.entity';
import { costProductionController } from './costsProduction.controller';
import { costProductionService } from './costsProduction.service';
import { costProductionRepository } from './costsProduction.repository';
import { AuthModule } from 'src/auth/auth.module';
import { usersModule } from 'src/users/users.module';
import { batchModule } from 'src/batch/batch.module';
import { profitabilityModule } from 'src/profitability/profitability.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CostsProductionEntity]),
        forwardRef(() => profitabilityModule),
        AuthModule,
        usersModule,
        batchModule,
    ],
    controllers: [costProductionController],
    providers: [costProductionService, costProductionRepository],
    exports: [costProductionRepository],
})
export class costProductionModule {}
