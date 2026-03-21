import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
} from '@nestjs/common';
import { userService } from './users.service';
import { RolesEnum } from 'src/enum/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('users')
export class usersController {
    constructor(private readonly usersService: userService) {}

    // Aqui iran los endpoints para manejar las solicitudes relacionadas con los usuarios

    @Get('getAllUser')
    @Roles(RolesEnum.ADMIN)
    getAllUser() {
        return this.usersService.getAllUserService();
    }

    @Get('getUserById/:uuid')
    @Roles(RolesEnum.ADMIN)
    getUserById(@Param('uuid', ParseUUIDPipe) uuid: string) {
        return this.usersService.getUserByIdService(uuid);
    }
}
