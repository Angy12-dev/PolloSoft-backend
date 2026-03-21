import { Injectable } from '@nestjs/common';
import { costProductionRepository } from './costsProduction.repository';

@Injectable()
export class costProductionService {
    constructor(
        private readonly costProductionRepository: costProductionRepository,
    ) {}

    // Aqui iran los metodos para manejar la logica de los costos de produccion

    getAllCostProductionService() {
        return this.costProductionRepository.getAllCostProductionRepository();
    }
}
