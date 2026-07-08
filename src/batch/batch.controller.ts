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
import { batchService } from './batch.service';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { RolesGuard } from 'src/auth/Guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/enum/roles.enum';
import { CreateBatchDto } from './Dtos/createBatch.dto';
import { UpdateBatchDto } from './Dtos/updateBatch.dto';

@Controller('batch')
export class batchController {
    constructor(private readonly batchService: batchService) {}

    // Aqui iran los endpoints para manejar las solicitudes relacionadas con el lote

    @Get('getAllBatch')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.OPERATOR)
    getAllBatch() {
        return this.batchService.getAllBatchService();
    }

    @Get('getBatchById/:uuid')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.OPERATOR)
    getBatchById(@Param('uuid', ParseUUIDPipe) id: string) {
        return this.batchService.getBatchByIdService(id);
    }

    @Post('createBatch')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.OPERATOR)
    createBatch(@Body() data: CreateBatchDto) {
        return this.batchService.createBatchService(data);
    }

    @Put('updateBatch')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.OPERATOR)
    updateBatch(@Body() data: UpdateBatchDto) {
        return this.batchService.updateBatchService(data);
    }

    @Delete('deleteBatch/:uuid')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    deleteBatch(@Param('uuid', ParseUUIDPipe) uuid: string) {
        return this.batchService.deleteBatchService(uuid);
    }
}
