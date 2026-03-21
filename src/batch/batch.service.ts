import { Injectable } from '@nestjs/common';
import { batchRepository } from './batch.repository';

@Injectable()
export class batchService {
    constructor(private readonly batchRepository: batchRepository) {}

    // Aqui iran los metodos para manejar la logica del lote

    getAllBatchService() {
        return this.batchRepository.getBatchRepository();
    }
}
