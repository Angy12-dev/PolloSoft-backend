import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfitabilityEntity } from 'src/entities/profitability.entity';
import { Repository } from 'typeorm';

@Injectable()
export class profitabilityRepository {
    constructor(
        @InjectRepository(ProfitabilityEntity)
        private readonly profitabilityDataBase: Repository<ProfitabilityEntity>,
    ) {}

    // Aqui iran los metodos para manejar la logica de la rentabilidad en la base de datos

    async getAllProfitabilityRepository() {
        const profitability = await this.profitabilityDataBase.find({});
        return profitability;
    }

    async getProfitabilityByIdRepository(id: string) {
        return this.profitabilityDataBase.findOne({
            where: { id },
            relations: ['users', 'batch'],
        });
    }

    async getProfitabilityByBatchIdRepository(batchId: string) {
        return this.profitabilityDataBase.findOne({
            where: { batch: { id: batchId } },
        });
    }

    async createProfitabilityRepository(data: Partial<ProfitabilityEntity>) {
        const profitability = this.profitabilityDataBase.create(data);
        return await this.profitabilityDataBase.save(profitability);
    }

    async updateProfitabilityByBatchRepository(
        existing: ProfitabilityEntity,
        data: Partial<ProfitabilityEntity>,
    ) {
        Object.assign(existing, data);
        await this.profitabilityDataBase.save(existing);
        return { message: 'Rentabilidad actualizada' };
    }
}
