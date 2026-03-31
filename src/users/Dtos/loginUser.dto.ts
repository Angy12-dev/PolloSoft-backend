import { PickType } from '@nestjs/mapped-types';
import { createUserDto } from './createUser.dto';

export class loginUserDto extends PickType(createUserDto, [
    'email',
    'password',
]) {}
