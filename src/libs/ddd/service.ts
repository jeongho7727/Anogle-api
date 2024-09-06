import { Inject } from 'typedi';
import { DddContext } from './context';

export abstract class DddService {
  @Inject()
  private context!: DddContext;
}
