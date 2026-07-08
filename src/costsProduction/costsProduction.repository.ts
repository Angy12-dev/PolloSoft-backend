import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CostsProductionEntity } from '../entities/costsProduction.entity';
import { Repository } from 'typeorm';
import { updateCostsProductionDto } from './Dtos/updateCostsProduction.dto';

@Injectable()
export class costProductionRepository {
    constructor(
        @InjectRepository(CostsProductionEntity)
        private readonly costProductionDataBase: Repository<CostsProductionEntity>,
    ) {}

    // Aqui iran los metodos para manejar la logica de los costos de produccion en la base de datos

    async getAllCostProductionRepository() {
        const costProduction = await this.costProductionDataBase.find({});
        return costProduction;
    }

    async getCostsProductionByIdRepository(id: string) {
        return this.costProductionDataBase.findOne({
            where: { id },
            relations: ['users', 'batch'],
        });
    }

    async getCostsProductionByBatchIdRepository(batchId: string) {
        return this.costProductionDataBase.find({
            where: { batch: { id: batchId } },
        });
    }

    async createCostProductionRepository(data: Partial<CostsProductionEntity>) {
        const costProduction = this.costProductionDataBase.create(data);
        return await this.costProductionDataBase.save(costProduction);
    }

    async updateCostProductionRepository(
        costsProductionExisting: CostsProductionEntity,
        data: updateCostsProductionDto,
    ) {
        if (data.costDate) {
            costsProductionExisting.costDate = new Date(
                `${data.costDate}T12:00:00`,
            );
        }

        if (data.description) {
            costsProductionExisting.description = data.description;
        }

        if (data.costType) {
            costsProductionExisting.costType = data.costType;
        }

        if (data.amount) {
            costsProductionExisting.amount = data.amount;
        }

        if (data.unitValue) {
            costsProductionExisting.unitValue = data.unitValue;
        }

        await this.costProductionDataBase.save(costsProductionExisting);
        return { message: 'Costo de produccion actualizado' };
    }

    async deleteCostProductionRepository(uuid: string) {
        await this.costProductionDataBase.delete(uuid);
        return { message: 'Costo de produccion eliminado' };
    }
}
