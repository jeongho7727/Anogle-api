import { Inject } from 'typedi';
import { Aggregate } from './aggregate';
import { DddContext } from './context';
import { EntityManager, ObjectType } from 'typeorm';
import { dataSourceMap } from '../typeorm';

export abstract class DddRepository<T extends Aggregate<T>> {
  @Inject()
  private context!: DddContext;

  protected abstract entityClass: ObjectType<T>;

  protected get getManager() {
    if (this.context.has(EntityManager)) {
      return this.context.get(EntityManager);
    }
    return this.context.get(dataSourceMap).default.manager;
  }

  private async saveEntities(entities: T[]) {
    return this.getManager.save(entities);
  }

  async save(entities: T[]) {
    entities.forEach((entity) => entity.setTxId(this.context.txId));
    await this.saveEntities(entities);
  }
}
