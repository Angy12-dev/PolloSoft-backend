import { Injectable, NotFoundException } from '@nestjs/common';
import { inventoryRepository } from './inventory.repository';
import { CreateInventoryDto } from './Dtos/createInventory.dto';
import { usersRepository } from 'src/users/users.repository';
import { batchRepository } from 'src/batch/batch.repository';
import { StateEnum } from 'src/enum/state.enum';
import { updateInventoryDto } from './Dtos/updateInventory.dto';

@Injectable()
export class inventoryService {
    constructor(
        private readonly inventoryRepository: inventoryRepository,
        private readonly usersRepository: usersRepository,
        private readonly batchRepository: batchRepository,
    ) {}

    // Aqui iran los metodos para manejar la logica del inventario

    getAllInventoryService() {
        return this.inventoryRepository.getAllInventoryRepository();
    }

    async getInventoryByIdService(id: string) {
        const inventoryExisting =
            await this.inventoryRepository.getInventoryByIdRepository(id);
        if (!inventoryExisting) {
            throw new NotFoundException('Este inventario no existe');
        }
        return inventoryExisting;
    }

    async createInventoryService(data: CreateInventoryDto) {
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

        const state =
            data.amount === 0
                ? StateEnum.OUT_OF_STOCK
                : data.amount <= 10
                  ? StateEnum.LOW_STOCK
                  : StateEnum.IN_STOCK;

        return await this.inventoryRepository.createInventoryRepository({
            registrationDate: new Date(`${data.registrationDate}T12:00:00`),
            product: data.product,
            amount: data.amount,
            unit: data.unit,
            state,
            users: userExisting,
        });
    }

    async updateInventoryService(data: updateInventoryDto) {
        const inventoryExisting =
            await this.inventoryRepository.getInventoryByIdRepository(
                data.uuid,
            );
        if (!inventoryExisting) {
            throw new NotFoundException('Este inventario no existe');
        }

        if (data.userId) {
            const userExisting =
                await this.usersRepository.getUserByIdRepository(data.userId);
            if (!userExisting)
                throw new NotFoundException(
                    'El usuario especificado no existe',
                );
            inventoryExisting.users = userExisting;
        }

        if (data.amount !== undefined) {
            inventoryExisting.state =
                data.amount === 0
                    ? StateEnum.OUT_OF_STOCK
                    : data.amount <= 10
                      ? StateEnum.LOW_STOCK
                      : StateEnum.IN_STOCK;
        }
        return this.inventoryRepository.updateInventoryRepository(
            inventoryExisting,
            data,
        );
    }

    async deleteInventoryService(uuid: string) {
        const inventoryExisting =
            await this.inventoryRepository.getInventoryByIdRepository(uuid);
        if (!inventoryExisting) {
            throw new NotFoundException('No existe el inventario');
        }
        return this.inventoryRepository.deleteInventoryRepository(uuid);
    }
}
