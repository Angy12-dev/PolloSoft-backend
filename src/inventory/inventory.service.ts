import { Injectable } from '@nestjs/common';
import { inventoryRepository } from './inventory.repository';

@Injectable()
export class inventoryService {
    constructor(private readonly inventoryRepository: inventoryRepository) {}

    // Aqui iran los metodos para manejar la logica del inventario

    getAllInventoryService() {
        return this.inventoryRepository.getAllInventoryRepository();
    }
}
