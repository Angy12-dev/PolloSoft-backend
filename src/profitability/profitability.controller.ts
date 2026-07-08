import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    UseGuards,
} from '@nestjs/common';
import { profitabilityService } from './profitability.service';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { RolesGuard } from 'src/auth/Guards/roles.guard';
import { RolesEnum } from 'src/enum/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateProfitabilityDto } from './Dtos/createProfitability.dto';

@Controller('profitability')
export class profitabilityController {
    constructor(private readonly profitabilityService: profitabilityService) {}

    // Aqui iran los endpoints para manejar las solicitudes relacionadas con la rentabilidad

    @Get('getAllProfitability')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    getAllProfitability() {
        return this.profitabilityService.getAllProfitabilityService();
    }

    @Get('getProfitabilityById/:uuid')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    getProfitabilityById(@Param('uuid', ParseUUIDPipe) id: string) {
        return this.profitabilityService.getProfitabilityByIdService(id);
    }
}
