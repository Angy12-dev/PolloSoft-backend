import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CostsProductionEntity } from '../entities/costsProduction.entity';
import { Repository } from 'typeorm';

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
}
