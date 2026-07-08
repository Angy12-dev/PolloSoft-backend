import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SalesEntity } from 'src/entities/sales.entity';
import { Repository } from 'typeorm';
import { UpdateSalesDto } from './Dtos/updateSales.dto';

@Injectable()
export class salesRepository {
    constructor(
        @InjectRepository(SalesEntity)
        private readonly salesDataBase: Repository<SalesEntity>,
    ) {}

    // Aqui iran los metodos para manejar la logica de las ventas en la base de datos

    async getAllSalesRepository() {
        const sales = await this.salesDataBase.find({});
        return sales;
    }

    async getSalesByIdRepository(id: string) {
        return this.salesDataBase.findOne({
            where: { id },
            relations: ['users', 'batch'],
        });
    }

    async getSalesByBatchIdRepository(batchId: string) {
        return this.salesDataBase.find({ where: { batch: { id: batchId } } });
    }

    async createdsalesRepository(data: Partial<SalesEntity>) {
        const sales = this.salesDataBase.create(data);
        return await this.salesDataBase.save(sales);
    }

    async updateSalesRepository(
        salesExisting: SalesEntity,
        data: UpdateSalesDto,
    ) {
        if (data.saleDate) {
            salesExisting.saleDate = new Date(`${data.saleDate}T12:00:00`);
        }

        if (data.amount) {
            salesExisting.amount = data.amount;
        }

        if (data.weightKg) {
            salesExisting.weightKg = data.weightKg;
        }

        if (data.unitValue) {
            salesExisting.unitValue = data.unitValue;
        }

        if (data.weightKg || data.unitValue) {
            const currentWeight =
                data.weightKg !== undefined
                    ? data.weightKg
                    : salesExisting.weightKg;
            const currentUnitValue =
                data.unitValue !== undefined
                    ? data.unitValue
                    : salesExisting.unitValue;

            salesExisting.totalValue = currentWeight * currentUnitValue;
        } else if (data.totalValue) {
            salesExisting.totalValue = data.totalValue;
        }

        await this.salesDataBase.save(salesExisting);
        return { message: 'Venta actualizada con éxito' };
    }

    async deleteSalesRepository(uuid: string) {
        await this.salesDataBase.delete(uuid);
        return { message: 'Venta eliminada' };
    }
}
