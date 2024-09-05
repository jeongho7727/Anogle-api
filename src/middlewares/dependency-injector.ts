import type { Context, Next } from 'koa';
import { Token } from 'typedi';
import { DddContext } from '../libs/ddd';

// TODO: 당장은 event driven 동작이 아니라서 여기서 한다. 나중에 ddd event
export const actorIdToken = new Token<string>('ActorId');

export const dependencyInjectorMiddleware = async (ctx: Context, next: Next) => {
  const { txId }: { txId: string } = ctx.state;
  let context;

  try {
    context = DddContext.of(txId);
    context.set(actorIdToken, '0');
    ctx.state.context = context;
    await next();
  } finally {
    if (context) {
      context.dispose();
    }
  }
};
