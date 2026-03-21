import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class usersRepository {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly userDataBase: Repository<UsersEntity>,
    ) {}

    // Aqui iran los metodos para manejar la logica de acceso a datos de los usuarios  (base de datos, etc)

    async getAllUserRepository() {
        const users = await this.userDataBase.find({});
        return users;
    }

    async getUserByIdRepository(uuid: string) {
        return await this.userDataBase.findOne({
            where: { id: uuid },
        });
    }
}
