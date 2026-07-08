import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { inventoryMovementService } from './inventoryMovement.service';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { RolesGuard } from 'src/auth/Guards/roles.guard';
import { RolesEnum } from 'src/enum/roles.enum';
import { CreateInventoryMovementDto } from './Dtos/createInventoryMovement.dto';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('inventoryMovement')
export class inventoryMovementController {
    constructor(
        private readonly inventoryMovementService: inventoryMovementService,
    ) {}

    // Aqui iran los endpoints para manejar las solicitudes relacionadas con el movimiento  de inventario

    @Post('createInventoryMovement')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.OPERATOR)
    createInventoryMovement(@Body() data: CreateInventoryMovementDto) {
        return this.inventoryMovementService.createInventoryMovementService(
            data,
        );
    }
}
