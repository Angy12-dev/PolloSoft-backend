import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './Dtos/createUser.dto';
import * as bcrypt from 'bcrypt';
import { updateUserDto } from './Dtos/updateUser.dto';

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

    async getUserByemail(email: string) {
        return await this.userDataBase.findOne({
            where: { email: email },
        });
    }

    async createUserRepository(data: createUserDto) {
        const hashedPassword: string = await bcrypt.hash(data.password, 10);

        const newUser = this.userDataBase.create({
            fullName: data.fullName,
            email: data.email,
            password: hashedPassword,
        });
        await this.userDataBase.save(newUser);

        return {
            message: `Usuario creado con nombre ${newUser.fullName} en la base de datos`,
        };
    }

    async updateUserRepository(userExisting: UsersEntity, data: updateUserDto) {
        if (data.fullName) {
            userExisting.fullName = data.fullName;
        }

        if (data.email) {
            userExisting.email = data.email;
        }

        if (data.password) {
            userExisting.password = await bcrypt.hash(data.password, 10);
        }

        await this.userDataBase.save(userExisting);
        return { message: 'Usuario actualizado correctamente' };
    }

    async deleteUserRepository(uuid: string) {
        await this.userDataBase.delete(uuid);
        return { message: 'Usuario eliminado correctamente' };
    }
}
