import { Container, Token } from 'typedi';
import { v4 as uuid } from 'uuid';

type ClassType<T> = new (...args: any[]) => T;

export class DddContext {
  static of(txId: string) {
    return new DddContext(txId);
  }

  get txId(): string {
    return this._txId;
  }

  private _txId: string;

  dispose() {
    this._dispose();
  }

  private _dispose: () => void;

  get<T>(type: ClassType<T> | Token<T>): T {
    return this._get(type);
  }

  private _get: <T>(type: ClassType<T> | Token<T>) => T;

  set<T>(type: ClassType<T> | Token<T>, instance: T) {
    this._set(type, instance);
  }

  private _set: <T>(type: ClassType<T> | Token<T>, instance: T) => void;

  has<T>(type: ClassType<T> | Token<T>): boolean {
    return this._has(type);
  }

  private _has: <T>(type: ClassType<T> | Token<T>) => boolean;

  protected constructor(txId: string) {
    const containerId = uuid();
    const container = Container.of(containerId);

    // @ts-expect-error protected로 정의해서 타입 오류 발생하므로 예외 처리
    container.set(DddContext, this);
    this._txId = txId;

    this._dispose = () => {
      Container.reset(containerId);
    };

    this._get = (type) => container.get(type as any); // HACK: overload 문제 해결 후 any 제거

    this._set = (type, instance) => container.set(type, instance);

    this._has = (type) => container.has(type as any); // HACK: overload 문제 해결 후 any 제거
  }
}
