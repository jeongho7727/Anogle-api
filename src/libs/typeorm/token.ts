import { Token } from 'typedi';
import { DataSource } from 'typeorm';

export const dataSourceMap = new Token<Record<string, DataSource>>('@dataSources');
