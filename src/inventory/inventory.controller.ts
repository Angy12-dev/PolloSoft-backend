import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { inventoryService } from './inventory.service';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { RolesGuard } from 'src/auth/Guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/enum/roles.enum';
import { CreateInventoryDto } from './Dtos/createInventory.dto';
import { updateInventoryDto } from './Dtos/updateInventory.dto';

@Controller('inventory')
export class inventoryController {
    constructor(private readonly inventoryService: inventoryService) {}

    // Aqui iran los endpoints para manejar las solicitudes relacionadas con el inventario

    @Get('getAllInventory')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.OPERATOR)
    getAllInventory() {
        return this.inventoryService.getAllInventoryService();
    }

    @Get('getInventoryById/:uuid')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.OPERATOR)
    getInventoryById(@Param('uuid', ParseUUIDPipe) id: string) {
        return this.inventoryService.getInventoryByIdService(id);
    }

    @Post('createInventory')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.OPERATOR)
    createInventory(@Body() data: CreateInventoryDto) {
        return this.inventoryService.createInventoryService(data);
    }

    @Put('updateInventory')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.OPERATOR)
    updateInventory(@Body() data: updateInventoryDto) {
        return this.inventoryService.updateInventoryService(data);
    }

    @Delete('deleteInventory/:uuid')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.OPERATOR)
    deleteInventory(@Param('uuid', ParseUUIDPipe) uuid: string) {
        return this.inventoryService.deleteInventoryService(uuid);
    }
}
