import {
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { costProductionRepository } from './costsProduction.repository';
import { CreateCostsProductionDto } from './Dtos/createCostsProduction.dto';
import { usersRepository } from 'src/users/users.repository';
import { batchRepository } from 'src/batch/batch.repository';
import { updateCostsProductionDto } from './Dtos/updateCostsProduction.dto';
import { profitabilityService } from 'src/profitability/profitability.service';

@Injectable()
export class costProductionService {
    constructor(
        private readonly costProductionRepository: costProductionRepository,
        private readonly usersRepository: usersRepository,
        private readonly batchRepository: batchRepository,
        @Inject(forwardRef(() => profitabilityService))
        private readonly profitabilityService: profitabilityService,
    ) {}

    // Aqui iran los metodos para manejar la logica de los costos de produccion

    getAllCostProductionService() {
        return this.costProductionRepository.getAllCostProductionRepository();
    }

    async getCostsProductionByIdService(id: string) {
        const costsProductionExisting =
            await this.costProductionRepository.getCostsProductionByIdRepository(
                id,
            );
        if (!costsProductionExisting) {
            throw new NotFoundException('Este Costo de produccion no existe');
        }
        return costsProductionExisting;
    }

    async createCostProductionService(data: CreateCostsProductionDto) {
        const userExisting = await this.usersRepository.getUserByIdRepository(
            data.userId,
        );
        if (!userExisting) {
            throw new NotFoundException('El usuario no existe');
        }

        const totalValue = data.amount * data.unitValue;

        const batchExisting = await this.batchRepository.getBatchByIdSimple(
            data.batchId,
        );
        if (!batchExisting) {
            throw new NotFoundException('Este lote no existe');
        }
        const newCost =
            await this.costProductionRepository.createCostProductionRepository({
                costDate: new Date(`${data.costDate}T12:00:00`),
                description: data.description,
                costType: data.costType,
                amount: data.amount,
                unitValue: data.unitValue,
                totalValue,
                users: userExisting,
                batch: batchExisting,
            });

        await this.profitabilityService.recalculateByBatchService(
            batchExisting.id,
            userExisting.id,
        );

        return newCost;
    }

    async updateCostProductionService(data: updateCostsProductionDto) {
        const costsProductionExisting =
            await this.costProductionRepository.getCostsProductionByIdRepository(
                data.uuid,
            );
        if (!costsProductionExisting) {
            throw new NotFoundException('Este costo de produccion no existe');
        }

        const originalBatchId = costsProductionExisting.batch.id;
        const originalUserId = costsProductionExisting.users.id;

        if (data.batchId) {
            const batchExisting = await this.batchRepository.getBatchByIdSimple(
                data.batchId,
            );
            if (!batchExisting)
                throw new NotFoundException('El lote especificado no existe');
            costsProductionExisting.batch = batchExisting;
        }

        if (data.userId) {
            const userExisting =
                await this.usersRepository.getUserByIdRepository(data.userId);
            if (!userExisting)
                throw new NotFoundException(
                    'El usuario especificado no existe',
                );
            costsProductionExisting.users = userExisting;
        }

        if (data.amount !== undefined || data.unitValue !== undefined) {
            const newAmount =
                data.amount ?? Number(costsProductionExisting.amount);
            const newUnitValue =
                data.unitValue ?? costsProductionExisting.unitValue;
            costsProductionExisting.totalValue = newAmount * newUnitValue;
        }

        const result =
            await this.costProductionRepository.updateCostProductionRepository(
                costsProductionExisting,
                data,
            );

        await this.profitabilityService.recalculateByBatchService(
            costsProductionExisting.batch.id,
            originalUserId,
        );

        if (
            data.batchId &&
            originalBatchId !== costsProductionExisting.batch.id
        ) {
            await this.profitabilityService.recalculateByBatchService(
                originalBatchId,
                originalUserId,
            );
        }

        return result;
    }

    async deleteCostProductionService(uuid: string) {
        const costsProductionExisting =
            await this.costProductionRepository.getCostsProductionByIdRepository(
                uuid,
            );
        if (!costsProductionExisting) {
            throw new NotFoundException('No existe el costo de produccion');
        }

        const batchId = costsProductionExisting.batch.id;
        const userId = costsProductionExisting.users.id;

        const result =
            await this.costProductionRepository.deleteCostProductionRepository(
                uuid,
            );

        await this.profitabilityService.recalculateByBatchService(
            batchId,
            userId,
        );

        return result;
    }
}
