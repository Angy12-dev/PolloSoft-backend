import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { batchRepository } from './batch.repository';
import { usersRepository } from 'src/users/users.repository';
import { CreateBatchDto } from './Dtos/createBatch.dto';
import { UpdateBatchDto } from './Dtos/updateBatch.dto';

@Injectable()
export class batchService {
    constructor(
        private readonly batchRepository: batchRepository,
        private readonly usersRepository: usersRepository,
    ) {}

    // Aqui iran los metodos para manejar la logica del lote

    getAllBatchService() {
        return this.batchRepository.getBatchRepository();
    }

    async getBatchByIdService(id: string) {
        const batchExisting =
            await this.batchRepository.getBatchByIdRepository(id);
        if (!batchExisting) {
            throw new NotFoundException('Este lote no existe');
        }
        return batchExisting;
    }

    async createBatchService(data: CreateBatchDto) {
        const userExisting = await this.usersRepository.getUserByIdRepository(
            data.userId,
        );
        if (!userExisting) {
            throw new NotFoundException('El usuario no existe');
        }
        return await this.batchRepository.createdBatchRepository({
            lotNumber: data.lotNumber,
            entryDate: new Date(`${data.entryDate}T12:00:00`),
            initialAmount: data.initialAmount,
            supplier: data.supplier,
            description: data.description,
            users: userExisting,
        });
    }
    async updateBatchService(data: UpdateBatchDto) {
        const batchExisting = await this.batchRepository.getBatchByIdRepository(
            data.uuid,
        );
        if (!batchExisting) {
            throw new NotFoundException('Este lote no existe');
        }

        return this.batchRepository.updateBatchRepository(batchExisting, data);
    }

    async deleteBatchService(uuid: string) {
        const batchExisting =
            await this.batchRepository.getBatchByIdRepository(uuid);
        if (!batchExisting) {
            throw new NotFoundException('No existe el lote');
        }
        return this.batchRepository.deleteBatchRepository(uuid);
    }
}
