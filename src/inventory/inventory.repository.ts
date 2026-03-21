import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryEntity } from 'src/entities/inventory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class inventoryRepository {
    constructor(
        @InjectRepository(InventoryEntity)
        private readonly inventoryDataBase: Repository<InventoryEntity>,
    ) {}

    // Aqui iran los metodos para manejar la logica del inventario en la base de datos

    async getAllInventoryRepository() {
        const inventory = await this.inventoryDataBase.find({});
        return inventory;
    }
}
