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
import { salesService } from './sales.service';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/enum/roles.enum';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { CreateSalesDto } from './Dtos/createSales.dto';
import { UpdateSalesDto } from './Dtos/updateSales.dto';
import { RolesGuard } from 'src/auth/Guards/roles.guard';

@Controller('sales')
export class salesController {
    constructor(private readonly salesService: salesService) {}

    // Aqui iran los endpoints para manejar las solicitudes relacionadas con las ventas

    @Get('getAllSales')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.SELLER)
    getAllUser() {
        return this.salesService.getAllSalesService();
    }

    @Get('getSalesById/:uuid')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.SELLER)
    getSalesById(@Param('uuid', ParseUUIDPipe) id: string) {
        return this.salesService.getSalesByIdService(id);
    }

    @Post('createSales')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.SELLER)
    createSales(@Body() data: CreateSalesDto) {
        return this.salesService.createSalesService(data);
    }

    @Put('updateSales')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.SELLER)
    updateSales(@Body() data: UpdateSalesDto) {
        return this.salesService.updateSalesService(data);
    }

    @Delete('deleteSales/:uuid')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.SELLER)
    deleteSales(@Param('uuid', ParseUUIDPipe) uuid: string) {
        return this.salesService.deleteSalesService(uuid);
    }
}
