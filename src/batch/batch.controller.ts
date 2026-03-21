import { Controller, Get } from '@nestjs/common';
import { batchService } from './batch.service';

@Controller('batch')
export class batchController {
    constructor(private readonly batchService: batchService) {}

    // Aqui iran los endpoints para manejar las solicitudes relacionadas con el lote

    @Get('getAllBatch')
    getAllBatch() {
        return this.batchService.getAllBatchService();
    }
}
