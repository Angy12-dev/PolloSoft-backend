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
import { userService } from './users.service';
import { RolesEnum } from 'src/enum/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { createUserDto } from './Dtos/createUser.dto';
import { updateUserDto } from './Dtos/updateUser.dto';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { RolesGuard } from 'src/auth/Guards/roles.guard';

@Controller('users')
export class usersController {
    constructor(private readonly usersService: userService) {}

    // Aqui iran los endpoints para manejar las solicitudes relacionadas con los usuarios

    @Get('getAllUser')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    getAllUser() {
        return this.usersService.getAllUserService();
    }

    @Get('getUserById/:uuid')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    getUserById(@Param('uuid', ParseUUIDPipe) uuid: string) {
        return this.usersService.getUserByIdService(uuid);
    }

    @Post('createUser')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    createUser(@Body() data: createUserDto) {
        return this.usersService.createUserService(data);
    }

    @Put('updateUser')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    updateUser(@Body() data: updateUserDto) {
        return this.usersService.updateUserService(data);
    }

    @Delete('deleteUser/:uuid')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    deleteUser(@Param('uuid', ParseUUIDPipe) uuid: string) {
        return this.usersService.deleteUserService(uuid);
    }
}
