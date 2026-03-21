import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryEntity } from 'src/entities/inventory.entity';
import { inventoryController } from './inventory.controller';
import { inventoryService } from './inventory.service';
import { inventoryRepository } from './inventory.repository';

@Module({
    imports: [TypeOrmModule.forFeature([InventoryEntity])],
    controllers: [inventoryController],
    providers: [inventoryService, inventoryRepository],
    exports: [inventoryRepository],
})
export class inventoryModule {}
