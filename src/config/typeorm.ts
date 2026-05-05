import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,

    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*{.ts, .js}'],

    synchronize: true,
    logging: true,

    ssl: {
        rejectUnauthorized: false,
    },
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config);
