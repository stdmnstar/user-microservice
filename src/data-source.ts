import 'reflect-metadata';
import { DataSource } from 'typeorm';
import User  from './entity/user';
import { DB_HOST, MYSQL_DATABASE, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_USER } from './common/config';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: DB_HOST,
  port: MYSQL_PORT,
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});


