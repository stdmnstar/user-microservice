import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const {
  MYSQL_ROOT_PASSWORD,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  TIME_ZONE,
  DB_HOST,
} = process.env;

export const MYSQL_PORT = Number(process.env['MYSQL_PORT'])
