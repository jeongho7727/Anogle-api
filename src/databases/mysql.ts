import { DataSource } from 'typeorm';
import { Container } from 'typedi';
import { dataSourceMap } from '../libs/typeorm';
import entities from './entities';

export const datasource = new DataSource({
  type: 'mysql',
  username: 'root',
  password: '1234',
  database: 'anogle',
  synchronize: true,
  entities,
});

Container.set({
  id: dataSourceMap,
  value: { default: datasource },
  global: true,
});
