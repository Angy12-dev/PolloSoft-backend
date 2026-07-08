import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfitabilityEntity } from 'src/entities/profitability.entity';
import { profitabilityController } from './profitability.controller';
import { profitabilityService } from './profitability.service';
import { profitabilityRepository } from './profitability.repository';
import { AuthModule } from 'src/auth/auth.module';
import { usersModule } from 'src/users/users.module';
import { batchModule } from 'src/batch/batch.module';
import { salesModule } from 'src/sales/sales.module';
import { costProductionModule } from 'src/costsProduction/costsProduction.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProfitabilityEntity]),
        forwardRef(() => salesModule),
        forwardRef(() => costProductionModule),
        AuthModule,
        usersModule,
        batchModule,
    ],
    controllers: [profitabilityController],
    providers: [profitabilityService, profitabilityRepository],
    exports: [profitabilityRepository, profitabilityService],
})
export class profitabilityModule {}
