import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BatchEntity } from 'src/entities/batch.entity';
import { CostsProductionEntity } from 'src/entities/costsProduction.entity';
import { InventoryEntity } from 'src/entities/inventory.entity';
import { ProfitabilityEntity } from 'src/entities/profitability.entity';
import { SalesEntity } from 'src/entities/sales.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { RolesEnum } from 'src/enum/roles.enum';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { StateEnum } from 'src/enum/state.enum';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';

@Injectable()
export class seedRepository {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersDataBase: Repository<UsersEntity>,

        @InjectRepository(SalesEntity)
        private readonly salesDataBase: Repository<SalesEntity>,

        @InjectRepository(ProfitabilityEntity)
        private readonly profitabilityDataBase: Repository<ProfitabilityEntity>,

        @InjectRepository(InventoryEntity)
        private readonly inventoryDataBase: Repository<InventoryEntity>,

        @InjectRepository(CostsProductionEntity)
        private readonly costsProductionDataBase: Repository<CostsProductionEntity>,

        @InjectRepository(BatchEntity)
        private readonly batchDataBase: Repository<BatchEntity>,
    ) {}

    async getSeedUsersRepository() {
        const contador = await this.usersDataBase.count();
        if (contador !== 0) {
            throw new ConflictException(
                'La base de datos ya contiene usuarios',
            );
        }
        const hashedPassword = await bcrypt.hash('Angy1012', 10);
        await this.usersDataBase.save([
            {
                fullName: 'Angy Ariza',
                email: 'angyzpao@gmail.com',
                password: hashedPassword,
                roles: RolesEnum.ADMIN,
            },
        ]);
        return { message: 'usuario creado con exito' };
    }

    async getSeedSalesRepository() {
        const contador = await this.salesDataBase.count();
        if (contador !== 0) {
            throw new ConflictException(
                'La base de datos ya contiene ventas registradas',
            );
        }

        const user = await this.usersDataBase.findOne({ where: {} });
        const batch = await this.batchDataBase.findOne({ where: {} });

        if (!user || !batch) {
            throw new ConflictException('No hay usuarios o lotes registrados');
        }

        await this.salesDataBase.save([
            {
                saleDate: new Date(),
                amount: 3,
                weightKg: 7.5,
                unitValue: 13000,
                totalValue: 97500,
                users: user,
                batch: batch,
            },
        ]);
        return { message: 'Venta creada con exito' };
    }

    async getSeedBatchRepository() {
        const contador = await this.batchDataBase.count();
        if (contador !== 0) {
            throw new ConflictException(
                'La base de datos ya contiene lotes registrados',
            );
        }

        const user = await this.usersDataBase.findOne({ where: {} });

        if (!user) {
            throw new ConflictException(
                'No hay usuarios registrados, ejecuta el seed de usuarios primero',
            );
        }

        await this.batchDataBase.save([
            {
                lotNumber: 'LOTE-001',
                entryDate: new Date('2026-01-10'),
                initialAmount: 500,
                supplier: 'Proveedor Principal',
                departureDate: new Date('2026-03-10'),
                description: 'Primer lote de pollos de engorde',
                users: user,
            },
        ]);

        return { message: 'Lote creado con exito' };
    }

    async getSeedInventoryRepository() {
        const contador = await this.inventoryDataBase.count();
        if (contador !== 0) {
            throw new ConflictException(
                'La base de datos ya contiene inventario registrados',
            );
        }
        const user = await this.usersDataBase.findOne({ where: {} });
        const batch = await this.batchDataBase.findOne({ where: {} });

        if (!user || !batch) {
            throw new ConflictException('No hay usuarios o lotes registrados');
        }
        await this.inventoryDataBase.save([
            {
                registrationDate: new Date(),
                product: 'Concentrado de engorde',
                amount: 5,
                unit: 'Bultos',
                state: StateEnum.IN_STOCK,
                users: user,
                batch: batch,
            },
        ]);
        return { message: 'Inventario creado con exito' };
    }

    async getSeedCostProductionRepository() {
        const contador = await this.costsProductionDataBase.count();
        if (contador !== 0) {
            throw new ConflictException(
                'La base de datos ya contiene costos de produccion registrados',
            );
        }
        const user = await this.usersDataBase.findOne({ where: {} });
        const batch = await this.batchDataBase.findOne({ where: {} });

        if (!user || !batch) {
            throw new ConflictException('No hay usuarios o lotes registrados');
        }
        await this.costsProductionDataBase.save([
            {
                costDate: new Date(),
                description:
                    'Concentrado de engorde marca Italcol linea dorada',
                costType: 'Alimentacion',
                amount: 8,
                unitValue: 100000,
                totalValue: 800000,
                users: user,
                batch: batch,
            },
        ]);
        return { message: 'Costo de produccion creado con exito' };
    }

    async getSeedProfitabilityRepository() {
        const contador = await this.profitabilityDataBase.count();
        if (contador !== 0) {
            throw new ConflictException(
                'La base de datos ya contiene rentabiliades registradas',
            );
        }
        const user = await this.usersDataBase.findOne({ where: {} });
        const batch = await this.batchDataBase.findOne({ where: {} });

        if (!user || !batch) {
            throw new ConflictException('No hay usuarios o lotes registrados');
        }
        await this.profitabilityDataBase.save([
            {
                startDate: new Date('2026-01-10'),
                endDate: new Date('2026-03-10'),
                totalIncome: 1500000,
                totalCost: 700000,
                netProfit: 800000,
                profitPercentage: 114.28,
                users: user,
                batch: batch,
            },
        ]);
        return { message: 'Rentabilidad creada con exito' };
    }
}
