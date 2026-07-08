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
import { costProductionService } from './costsProduction.service';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/Guards/roles.guard';
import { RolesEnum } from 'src/enum/roles.enum';
import { CreateCostsProductionDto } from './Dtos/createCostsProduction.dto';
import { updateCostsProductionDto } from './Dtos/updateCostsProduction.dto';

@Controller('costProduction')
export class costProductionController {
    constructor(
        private readonly costProductionService: costProductionService,
    ) {}

    // Aqui iran los endpoint para manejar las solicitudes relacionadas con los costos de produccion

    @Get('getAllCostProduction')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    getAllCostProduction() {
        return this.costProductionService.getAllCostProductionService();
    }

    @Get('getCostProductionById/:uuid')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    getCostsProductionById(@Param('uuid', ParseUUIDPipe) id: string) {
        return this.costProductionService.getCostsProductionByIdService(id);
    }

    @Post('createCostProduction')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.OPERATOR)
    createCostProduction(@Body() data: CreateCostsProductionDto) {
        return this.costProductionService.createCostProductionService(data);
    }

    @Put('updateCostProduction')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.OPERATOR)
    update(@Body() data: updateCostsProductionDto) {
        return this.costProductionService.updateCostProductionService(data);
    }

    @Delete('deleteCostProduction/:uuid')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.OPERATOR)
    deleteCostProduction(@Param('uuid', ParseUUIDPipe) uuid: string) {
        return this.costProductionService.deleteCostProductionService(uuid);
    }
}
