import { DataSource } from 'typeorm';
import entities from './entities';
import { docs } from '../config';
import Container from 'typedi';
import { dataSourceMap } from '../libs/ddd/repository';

export const datasource = new DataSource({
  type: 'mysql',
  entities,
  synchronize: true,
  ...docs.mysql,
});

Container.set({
  id: dataSourceMap,
  value: { default: datasource },
  global: true,
});
