import { DataSource } from 'typeorm';
import entities from './entities';
import { docs } from '../config';

export const datasource = new DataSource({
  type: 'mysql',
  ...entities,
  ...docs.mysql,
});
