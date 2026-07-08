import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryEntity } from 'src/entities/inventory.entity';
import { Repository } from 'typeorm';
import { updateInventoryDto } from './Dtos/updateInventory.dto';
import { StateEnum } from 'src/enum/state.enum';

@Injectable()
export class inventoryRepository {
    constructor(
        @InjectRepository(InventoryEntity)
        private readonly inventoryDataBase: Repository<InventoryEntity>,
    ) {}

    // Aqui iran los metodos para manejar la logica del inventario en la base de datos

    async getAllInventoryRepository() {
        const inventory = await this.inventoryDataBase.find({});
        return inventory;
    }

    async getInventoryByIdRepository(id: string) {
        return this.inventoryDataBase.findOne({
            where: { id },
            relations: ['users'],
        });
    }

    async createInventoryRepository(data: Partial<InventoryEntity>) {
        const inventory = this.inventoryDataBase.create(data);
        return await this.inventoryDataBase.save(inventory);
    }

    async updateInventoryRepository(
        inventoryExisting: InventoryEntity,
        data: updateInventoryDto,
    ) {
        if (data.registrationDate) {
            inventoryExisting.registrationDate = new Date(
                `${data.registrationDate}T12:00:00`,
            );
        }

        if (data.product) {
            inventoryExisting.product = data.product;
        }

        if (data.amount !== undefined) {
            inventoryExisting.amount = data.amount;

            inventoryExisting.state =
                data.amount === 0
                    ? StateEnum.OUT_OF_STOCK
                    : data.amount <= 10
                      ? StateEnum.LOW_STOCK
                      : StateEnum.IN_STOCK;
        }

        if (data.unit) {
            inventoryExisting.unit = data.unit;
        }

        await this.inventoryDataBase.save(inventoryExisting);
        return { message: 'Inventario actualizado' };
    }

    async deleteInventoryRepository(uuid: string) {
        await this.inventoryDataBase.delete(uuid);
        return { message: 'Inventario eliminado' };
    }
}
