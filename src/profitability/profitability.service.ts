import { Injectable, NotFoundException } from '@nestjs/common';
import { profitabilityRepository } from './profitability.repository';
import { usersRepository } from 'src/users/users.repository';
import { batchRepository } from 'src/batch/batch.repository';
import { salesRepository } from 'src/sales/sales.repository';
import { costProductionRepository } from 'src/costsProduction/costsProduction.repository';

@Injectable()
export class profitabilityService {
    constructor(
        private readonly profitabilityRepository: profitabilityRepository,
        private readonly usersRepository: usersRepository,
        private readonly batchRepository: batchRepository,
        private readonly salesRepository: salesRepository,
        private readonly costProductionRepository: costProductionRepository,
    ) {}

    //Aqui iran los metodos para manejar la logica de la rentabilidad

    getAllProfitabilityService() {
        return this.profitabilityRepository.getAllProfitabilityRepository();
    }

    async getProfitabilityByIdService(id: string) {
        const profitabilityExisting =
            await this.profitabilityRepository.getProfitabilityByIdRepository(
                id,
            );
        if (!profitabilityExisting) {
            throw new NotFoundException('Esta rentabilidad no existe');
        }
        return profitabilityExisting;
    }

    async recalculateByBatchService(batchId: string, userId: string) {
        const batchExisting =
            await this.batchRepository.getBatchByIdSimple(batchId);
        if (!batchExisting) {
            throw new NotFoundException('Este lote no existe');
        }

        const userExisting =
            await this.usersRepository.getUserByIdRepository(userId);
        if (!userExisting) {
            throw new NotFoundException('El usuario no existe');
        }

        const sales =
            await this.salesRepository.getSalesByBatchIdRepository(batchId);
        const costs =
            await this.costProductionRepository.getCostsProductionByBatchIdRepository(
                batchId,
            );

        const totalIncome = sales.reduce(
            (sum, sale) => sum + Number(sale.totalValue),
            0,
        );
        const totalCost = costs.reduce(
            (sum, cost) => sum + Number(cost.totalValue),
            0,
        );
        const netProfit = totalIncome - totalCost;
        const profitPercentage =
            totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0;

        const profitabilityData = {
            startDate: batchExisting.entryDate,
            endDate: batchExisting.departureDate ?? null,
            totalIncome,
            totalCost,
            netProfit,
            profitPercentage,
            users: userExisting,
            batch: batchExisting,
        };

        const existingProfitability =
            await this.profitabilityRepository.getProfitabilityByBatchIdRepository(
                batchId,
            );

        if (existingProfitability) {
            return this.profitabilityRepository.updateProfitabilityByBatchRepository(
                existingProfitability,
                profitabilityData,
            );
        }

        return this.profitabilityRepository.createProfitabilityRepository(
            profitabilityData,
        );
    }
}
