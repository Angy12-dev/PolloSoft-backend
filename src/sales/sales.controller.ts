import { Controller, Get } from '@nestjs/common';
import { salesService } from './sales.service';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/enum/roles.enum';

@Controller('sales')
export class salesController {
    constructor(private readonly salesService: salesService) {}

    // Aqui iran los endpoints para manejar las solicitudes relacionadas con las ventas

    @Get('getAllSales')
    getAllUser() {
        return this.salesService.getAllSalesService();
    }
}
