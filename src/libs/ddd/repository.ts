import { Inject, Token } from 'typedi';
import { EntityManager, ObjectType, DataSource } from 'typeorm';
import { Aggregate } from './aggregate';
import { DddContext } from './context';

export const dataSourceMap = new Token<Record<string, DataSource>>('@dataSources');

export abstract class DddRepository<T extends Aggregate<T>, ID extends number | string = number> {
  @Inject()
  private context!: DddContext;

  protected abstract entityClass: ObjectType<T>;

  protected get entityManager(): EntityManager {
    if (this.context.has(EntityManager)) {
      return this.context.get(EntityManager);
    }
    return this.context.get(dataSourceMap).default.manager;
  }

  private async saveEntities(entities: T[]) {
    return this.entityManager.save(entities, { reload: true });
  }

  public async save(entities: T[]) {
    await this.saveEntities(entities);
  }
}
