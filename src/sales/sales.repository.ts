import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SalesEntity } from 'src/entities/sales.entity';
import { Repository } from 'typeorm';

@Injectable()
export class salesRepository {
    constructor(
        @InjectRepository(SalesEntity)
        private readonly salesDataBase: Repository<SalesEntity>,
    ) {}

    // Aqui iran los metodos para manejar la logica de las ventas en la base de datos

    async getAllSalesRepository() {
        const sales = await this.salesDataBase.find({});
        return sales;
    }
}
