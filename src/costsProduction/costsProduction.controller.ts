import { Controller, Get } from '@nestjs/common';
import { costProductionService } from './costsProduction.service';

@Controller('costProduction')
export class costProductionController {
    constructor(
        private readonly costProductionService: costProductionService,
    ) {}

    // Aqui iran los endpoint para manejar las solicitudes relacionadas con los costos de produccion

    @Get('getAllCostProduction')
    getAllCostProduction() {
        return this.costProductionService.getAllCostProductionService();
    }
}
