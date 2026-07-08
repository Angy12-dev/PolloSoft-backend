import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BatchEntity } from 'src/entities/batch.entity';
import { batchController } from './batch.controller';
import { batchService } from './batch.service';
import { batchRepository } from './batch.repository';
import { AuthModule } from 'src/auth/auth.module';
import { usersModule } from 'src/users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([BatchEntity]), usersModule, AuthModule],
    controllers: [batchController],
    providers: [batchService, batchRepository],
    exports: [batchRepository],
})
export class batchModule {}
