import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryEntity } from 'src/entities/inventory.entity';
import { inventoryController } from './inventory.controller';
import { inventoryService } from './inventory.service';
import { inventoryRepository } from './inventory.repository';
import { AuthModule } from 'src/auth/auth.module';
import { usersModule } from 'src/users/users.module';
import { batchModule } from 'src/batch/batch.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([InventoryEntity]),
        AuthModule,
        usersModule,
        batchModule,
    ],
    controllers: [inventoryController],
    providers: [inventoryService, inventoryRepository],
    exports: [inventoryRepository],
})
export class inventoryModule {}
