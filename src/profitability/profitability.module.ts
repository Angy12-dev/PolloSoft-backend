import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfitabilityEntity } from 'src/entities/profitability.entity';
import { profitabilityController } from './profitability.controller';
import { profitabilityService } from './profitability.service';
import { profitabilityRepository } from './profitability.repository';

@Module({
    imports: [TypeOrmModule.forFeature([ProfitabilityEntity])],
    controllers: [profitabilityController],
    providers: [profitabilityService, profitabilityRepository],
    exports: [profitabilityRepository],
})
export class profitabilityModule {}
