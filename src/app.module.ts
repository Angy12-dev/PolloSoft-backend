import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { usersModule } from './users/users.module';
import { salesModule } from './sales/sales.module';
import { inventoryModule } from './inventory/inventory.module';
import { batchModule } from './batch/batch.module';
import { profitabilityModule } from './profitability/profitability.module';
import { costProductionModule } from './costsProduction/costsProduction.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [typeorm],
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => config.get('typeorm') ?? {},
        }),
        TypeOrmModule.forFeature([UsersEntity]),
        usersModule,
        salesModule,
        inventoryModule,
        batchModule,
        profitabilityModule,
        costProductionModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
