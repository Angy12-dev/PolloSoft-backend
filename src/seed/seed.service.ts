import { Injectable } from '@nestjs/common';
import { seedRepository } from './seed.repository';

@Injectable()
export class seedService {
    constructor(private readonly seedRepository: seedRepository) {}

    getSeedUsersService() {
        return this.seedRepository.getSeedUsersRepository();
    }
}
