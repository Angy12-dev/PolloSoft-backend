import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesEntity } from 'src/entities/sales.entity';
import { salesController } from './sales.controller';
import { salesService } from './sales.service';
import { salesRepository } from './sales.repository';

@Module({
    imports: [TypeOrmModule.forFeature([SalesEntity])],
    controllers: [salesController],
    providers: [salesService, salesRepository],
    exports: [salesRepository],
})
export class salesModule {}
