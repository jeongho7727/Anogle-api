import { Inject } from 'typedi';
import { DddContext } from './context';

export class DddService {
  @Inject()
  private context!: DddContext;
}
