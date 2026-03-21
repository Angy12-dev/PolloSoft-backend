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
}
