import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { usersController } from './users.controller';
import { userService } from './users.service';
import { usersRepository } from './users.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity]), AuthModule],

    controllers: [usersController],
    providers: [userService, usersRepository],
    exports: [usersRepository],
})
export class usersModule {}
