import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Peca } from './entities/Peca';
import { Marca } from './entities/Marca';
import { Evento } from './entities/Evento';
import { Despesa } from './entities/Despesa';
import { Config } from './entities/Config';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    
    entities: [Marca, Peca, Despesa, Evento ,Config], 
    
    migrations: [],
    
    synchronize: true, 
    logging: false,
});