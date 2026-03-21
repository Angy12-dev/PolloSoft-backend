import { Controller, Get } from '@nestjs/common';
import { inventoryService } from './inventory.service';

@Controller('inventory')
export class inventoryController {
    constructor(private readonly inventoryService: inventoryService) {}

    // Aqui iran los endpoints para manejar las solicitudes relacionadas con el inventario

    @Get('getAllInventory')
    getAllInventory() {
        return this.inventoryService.getAllInventoryService();
    }
}
