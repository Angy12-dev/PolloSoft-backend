import { Injectable } from '@nestjs/common';
import { profitabilityRepository } from './profitability.repository';

@Injectable()
export class profitabilityService {
    constructor(
        private readonly profitabilityRepository: profitabilityRepository,
    ) {}

    //Aqui iran los metodos para manejar la logica de los pagos

    getAllProfitabilityService() {
        return this.profitabilityRepository.getAllProfitabilityRepository();
    }
}
