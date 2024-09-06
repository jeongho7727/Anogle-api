import { DataSource } from 'typeorm';
import { Container } from 'typedi';
import { dataSourceMap } from '../libs/typeorm';
import entities from './entities';
import { docs } from '../config';

export const datasource = new DataSource({
  type: 'mysql',
  username: docs.mysql.username,
  password: docs.mysql.password,
  database: docs.mysql.database,
  synchronize: true,
  entities,
});

Container.set({
  id: dataSourceMap,
  value: { default: datasource },
  global: true,
});
