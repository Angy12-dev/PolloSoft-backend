import { PartialType } from '@nestjs/mapped-types';
import { createUserDto } from './createUser.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class updateUserDto extends PartialType(createUserDto) {
    @IsNotEmpty({ message: 'El id del usuario es obligatorio' })
    @IsUUID('4', {
        message: 'El id del usuario debe tener un formato UUID válido',
    })
    uuid: string;
}
