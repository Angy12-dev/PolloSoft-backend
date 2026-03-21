import { Controller, Get } from '@nestjs/common';
import { profitabilityService } from './profitability.service';

@Controller('profitability')
export class profitabilityController {
    constructor(private readonly profitabilityService: profitabilityService) {}

    // Aqui iran los endpoints para manejar las solicitudes relacionadas con la rentabilidad

    @Get('getAllProfitability')
    getAllProfitability() {
        return this.profitabilityService.getAllProfitabilityService();
    }
}
