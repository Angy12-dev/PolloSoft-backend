import { Injectable } from '@nestjs/common';
import { usersRepository } from './users.repository';

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
}
