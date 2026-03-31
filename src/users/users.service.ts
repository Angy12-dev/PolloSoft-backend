import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { usersRepository } from './users.repository';
import { createUserDto } from './Dtos/createUser.dto';
import { updateUserDto } from './Dtos/updateUser.dto';
import { not } from 'rxjs/internal/util/not';

@Injectable()
export class userService {
    constructor(private readonly usersRepository: usersRepository) {}

    // Aqui iran los metodos para manejar la logica de los usuarios

    getAllUserService() {
        return this.usersRepository.getAllUserRepository();
    }

    async getUserByIdService(uuid: string) {
        const userExisting =
            await this.usersRepository.getUserByIdRepository(uuid);
        return userExisting;
    }

    async createUserService(data: createUserDto) {
        const emailExisting = await this.usersRepository.getUserByemail(
            data.email,
        );
        if (emailExisting) {
            throw new ConflictException(
                'Este correo ya esta registrado, por favor ingrese otro correo',
            );
        }

        return this.usersRepository.createUserRepository(data);
    }

    async updateUserService(data: updateUserDto) {
        const userExisting = await this.usersRepository.getUserByIdRepository(
            data.uuid,
        );
        if (!userExisting) {
            throw new NotFoundException('No existe el usuario');
        }

        if (data.email) {
            const emailExisting = await this.usersRepository.getUserByemail(
                data.email,
            );
            if (emailExisting) {
                throw new ConflictException(
                    'Este correo ya esta registrado, por favor ingrese otro correo',
                );
            }
        }
        return this.usersRepository.updateUserRepository(userExisting, data);
    }

    async deleteUserService(uuid: string) {
        const userExisting =
            await this.usersRepository.getUserByIdRepository(uuid);
        if (!userExisting) {
            throw new NotFoundException('No existe el usuario');
        }
        return this.usersRepository.deleteUserRepository(uuid);
    }
}
