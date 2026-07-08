import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesEntity } from 'src/entities/sales.entity';
import { salesController } from './sales.controller';
import { salesService } from './sales.service';
import { salesRepository } from './sales.repository';
import { AuthModule } from 'src/auth/auth.module';
import { usersModule } from 'src/users/users.module';
import { batchModule } from 'src/batch/batch.module';
import { profitabilityModule } from 'src/profitability/profitability.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([SalesEntity]),
        forwardRef(() => profitabilityModule),
        AuthModule,
        usersModule,
        batchModule,
    ],
    controllers: [salesController],
    providers: [salesService, salesRepository],
    exports: [salesRepository],
})
export class salesModule {}
