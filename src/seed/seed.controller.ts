import { Controller, Get } from '@nestjs/common';
import { seedService } from './seed.service';

@Controller('seed') // Nombre del controlador, ruta base
export class seedController {
    // Nombre de la clase
    constructor(private readonly seedService: seedService) {} // como se construye la clase

    @Get('seedUsers') // Tipo de peticion con su nombre
    getSeedUsers() {
        // Nombre del metodo
        return this.seedService.getSeedUsersService();
    }
}
