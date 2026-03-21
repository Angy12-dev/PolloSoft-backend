import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BatchEntity } from 'src/entities/batch.entity';
import { Repository } from 'typeorm';

@Injectable()
export class batchRepository {
    constructor(
        @InjectRepository(BatchEntity)
        private readonly batchDataBAse: Repository<BatchEntity>,
    ) {}

    // Aqui iran los metodos para manejar la logica de los lotes en la base de datos

    async getBatchRepository() {
        const batch = await this.batchDataBAse.find({});
        return batch;
    }
}
