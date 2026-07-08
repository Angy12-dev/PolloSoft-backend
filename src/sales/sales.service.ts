import {
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { salesRepository } from './sales.repository';
import { usersRepository } from 'src/users/users.repository';
import { batchRepository } from 'src/batch/batch.repository';
import { CreateSalesDto } from './Dtos/createSales.dto';
import { UpdateSalesDto } from './Dtos/updateSales.dto';
import { profitabilityService } from 'src/profitability/profitability.service';

@Injectable()
export class salesService {
    constructor(
        private readonly salesRepository: salesRepository,
        private readonly usersRepository: usersRepository,
        private readonly batchRepository: batchRepository,
        @Inject(forwardRef(() => profitabilityService))
        private readonly profitabilityService: profitabilityService,
    ) {}

    // Aqui iran los metodos para manejar la logica de las ventas

    getAllSalesService() {
        return this.salesRepository.getAllSalesRepository();
    }

    async getSalesByIdService(id: string) {
        const salesExisting =
            await this.salesRepository.getSalesByIdRepository(id);
        if (!salesExisting) {
            throw new NotFoundException('Esta venta no existe');
        }
        return salesExisting;
    }

    async createSalesService(data: CreateSalesDto) {
        const userExisting = await this.usersRepository.getUserByIdRepository(
            data.userId,
        );
        if (!userExisting) {
            throw new NotFoundException('El usuario no existe');
        }

        const batchExisting = await this.batchRepository.getBatchByIdSimple(
            data.batchId,
        );
        if (!batchExisting) {
            throw new NotFoundException('Este lote no existe');
        }

        const calculatedTotal = data.weightKg * data.unitValue;

        const newSale = await this.salesRepository.createdsalesRepository({
            saleDate: new Date(`${data.saleDate}T12:00:00`),
            amount: data.amount,
            weightKg: data.weightKg,
            unitValue: data.unitValue,
            totalValue: calculatedTotal,
            users: userExisting,
            batch: batchExisting,
        });

        await this.profitabilityService.recalculateByBatchService(
            batchExisting.id,
            userExisting.id,
        );

        return newSale;
    }

    async updateSalesService(data: UpdateSalesDto) {
        const salesExisting = await this.salesRepository.getSalesByIdRepository(
            data.uuid,
        );
        if (!salesExisting) {
            throw new NotFoundException('Esta venta no existe');
        }
        const result = await this.salesRepository.updateSalesRepository(
            salesExisting,
            data,
        );

        await this.profitabilityService.recalculateByBatchService(
            salesExisting.batch.id,
            salesExisting.users.id,
        );

        return result;
    }

    async deleteSalesService(uuid: string) {
        const salesExisting =
            await this.salesRepository.getSalesByIdRepository(uuid);
        if (!salesExisting) {
            throw new NotFoundException('No existe la venta');
        }

        const batchId = salesExisting.batch.id;
        const userId = salesExisting.users.id;

        const result = await this.salesRepository.deleteSalesRepository(uuid);
        await this.profitabilityService.recalculateByBatchService(
            batchId,
            userId,
        );

        return result;
    }
}
