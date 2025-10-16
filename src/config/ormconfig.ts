import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  // 👇 Importante: entidades bajo subcarpetas /entities
  entities: ['src/**/entities/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
});
