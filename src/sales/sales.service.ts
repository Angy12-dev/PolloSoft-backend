import { Injectable } from '@nestjs/common';
import { salesRepository } from './sales.repository';

@Injectable()
export class salesService {
    constructor(private readonly salesRepository: salesRepository) {}

    // Aqui iran los metodos para manejar la logica de las ventas

    getAllSalesService() {
        return this.salesRepository.getAllSalesRepository();
    }
}
