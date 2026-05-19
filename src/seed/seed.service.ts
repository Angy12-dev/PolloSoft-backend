import { Injectable } from '@nestjs/common';
import { seedRepository } from './seed.repository';

@Injectable()
export class seedService {
    constructor(private readonly seedRepository: seedRepository) {}

    getSeedUsersService() {
        return this.seedRepository.getSeedUsersRepository();
    }

    getSeedSalesService() {
        return this.seedRepository.getSeedSalesRepository();
    }

    getSeedBatchService() {
        return this.seedRepository.getSeedBatchRepository();
    }

    getSeedInventoryService() {
        return this.seedRepository.getSeedInventoryRepository();
    }

    getSeedCostProductionService() {
        return this.seedRepository.getSeedCostProductionRepository();
    }

    getSeedProfitabilityService() {
        return this.seedRepository.getSeedProfitabilityRepository();
    }
}
