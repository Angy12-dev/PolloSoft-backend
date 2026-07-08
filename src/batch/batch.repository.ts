import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BatchEntity } from 'src/entities/batch.entity';
import { Repository } from 'typeorm';
import { UpdateBatchDto } from './Dtos/updateBatch.dto';

@Injectable()
export class batchRepository {
    constructor(
        @InjectRepository(BatchEntity)
        private readonly batchDataBase: Repository<BatchEntity>,
    ) {}

    // Aqui iran los metodos para manejar la logica de los lotes en la base de datos

    async getBatchRepository() {
        const batch = await this.batchDataBase.find({});
        return batch;
    }

    async getBatchByIdRepository(uuid: string) {
        return await this.batchDataBase.findOne({
            where: { id: uuid },
            relations: [
                'users',
                'sales',
                'inventory',
                'costProduction',
                'profitability',
            ],
        });
    }

    async getBatchByIdSimple(uuid: string) {
        return await this.batchDataBase.findOne({
            where: { id: uuid },
        });
    }

    async createdBatchRepository(data: Partial<BatchEntity>) {
        const batch = this.batchDataBase.create(data);
        return await this.batchDataBase.save(batch);
    }

    async updateBatchRepository(
        batchExisting: BatchEntity,
        data: UpdateBatchDto,
    ) {
        if (data.lotNumber) {
            batchExisting.lotNumber = data.lotNumber;
        }

        if (data.entryDate) {
            batchExisting.entryDate = new Date(`${data.entryDate}T12:00:00`);
        }

        if (data.initialAmount) {
            batchExisting.initialAmount = data.initialAmount;
        }

        if (data.supplier) {
            batchExisting.supplier = data.supplier;
        }

        if (data.departureDate) {
            batchExisting.departureDate = new Date(data.departureDate);
        }

        if (data.description) {
            batchExisting.description = data.description;
        }

        await this.batchDataBase.save(batchExisting);
        return { message: 'Lote actualizado' };
    }

    async deleteBatchRepository(uuid: string) {
        await this.batchDataBase.delete(uuid);
        return { message: 'Lote eliminado' };
    }
}
