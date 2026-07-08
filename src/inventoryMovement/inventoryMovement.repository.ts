import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryMovementEntity } from 'src/entities/inventoryMovement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class inventoryMovementRepository {
    constructor(
        @InjectRepository(InventoryMovementEntity)
        private readonly inventoryMovementDataBase: Repository<InventoryMovementEntity>,
    ) {}

    async createInventoryMovementRepository(
        data: Partial<InventoryMovementEntity>,
    ) {
        const movement = this.inventoryMovementDataBase.create(data);
        return await this.inventoryMovementDataBase.save(movement);
    }
}
