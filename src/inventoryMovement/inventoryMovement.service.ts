import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { inventoryMovementRepository } from './inventoryMovement.repository';
import { inventoryRepository } from 'src/inventory/inventory.repository';
import { batchRepository } from 'src/batch/batch.repository';
import { usersRepository } from 'src/users/users.repository';
import { CreateInventoryMovementDto } from './Dtos/createInventoryMovement.dto';
import { StateEnum } from 'src/enum/state.enum';
import { MovementType } from 'src/enum/movementType.enum';

@Injectable()
export class inventoryMovementService {
    constructor(
        private readonly inventoryMovementRepository: inventoryMovementRepository,
        private readonly inventoryRepository: inventoryRepository,
        private readonly batchRepository: batchRepository,
        private readonly usersRepository: usersRepository,
    ) {}

    async createInventoryMovementService(data: CreateInventoryMovementDto) {
        const inventoryExisting =
            await this.inventoryRepository.getInventoryByIdRepository(
                data.inventoryId,
            );
        if (!inventoryExisting) {
            throw new NotFoundException('Este inventario no existe');
        }

        const batchExisting = await this.batchRepository.getBatchByIdSimple(
            data.batchId,
        );
        if (!batchExisting) {
            throw new NotFoundException('Este lote no existe');
        }

        const userExisting = await this.usersRepository.getUserByIdRepository(
            data.userId,
        );
        if (!userExisting) {
            throw new NotFoundException('El usuario no existe');
        }

        const currentAmount = Number(inventoryExisting.amount);
        const newAmount = currentAmount - data.quantity;

        if (newAmount < 0) {
            throw new BadRequestException(
                'No hay suficiente stock disponible para este movimiento',
            );
        }

        inventoryExisting.amount = newAmount;
        inventoryExisting.state =
            newAmount === 0
                ? StateEnum.OUT_OF_STOCK
                : newAmount <= 10
                  ? StateEnum.LOW_STOCK
                  : StateEnum.IN_STOCK;

        await this.inventoryRepository.updateInventoryRepository(
            inventoryExisting,
            {
                amount: newAmount,
                uuid: '',
            },
        );

        const newMovement =
            await this.inventoryMovementRepository.createInventoryMovementRepository(
                {
                    quantity: data.quantity,
                    movementType: MovementType.OUT,
                    description: data.description,
                    inventory: inventoryExisting,
                    batch: batchExisting,
                    users: userExisting,
                },
            );

        return {
            message: 'Movimiento registrado correctamente',
        };
    }
}
