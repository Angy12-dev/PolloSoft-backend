import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { batchModule } from 'src/batch/batch.module';
import { InventoryMovementEntity } from 'src/entities/inventoryMovement.entity';
import { inventoryModule } from 'src/inventory/inventory.module';
import { usersModule } from 'src/users/users.module';
import { inventoryMovementController } from './inventoryMovement.controller';
import { inventoryService } from 'src/inventory/inventory.service';
import { inventoryRepository } from 'src/inventory/inventory.repository';
import { inventoryMovementService } from './inventoryMovement.service';
import { inventoryMovementRepository } from './inventoryMovement.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([InventoryMovementEntity]),
        AuthModule,
        usersModule,
        batchModule,
        inventoryModule,
    ],
    controllers: [inventoryMovementController],
    providers: [inventoryMovementService, inventoryMovementRepository],
    exports: [inventoryMovementRepository],
})
export class inventoryMovementModule {}
