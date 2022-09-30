import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { DB_HOST, MYSQL_DATABASE, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_USER } from './common/config';
import User from './model/user';

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

let dataSource: DataSource | null = null;

export const initDataSource = async () => {
  try {
    if (!dataSource) dataSource = await AppDataSource.initialize();
  } catch (error) {
    console.log(error)
  }

  return dataSource as DataSource;
}



