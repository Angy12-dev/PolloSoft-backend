import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostsProductionEntity } from '../entities/costsProduction.entity';
import { costProductionController } from './costsProduction.controller';
import { costProductionService } from './costsProduction.service';
import { costProductionRepository } from './costsProduction.repository';

@Module({
    imports: [TypeOrmModule.forFeature([CostsProductionEntity])],
    controllers: [costProductionController],
    providers: [costProductionService, costProductionRepository],
    exports: [costProductionRepository],
})
export class costProductionModule {}
