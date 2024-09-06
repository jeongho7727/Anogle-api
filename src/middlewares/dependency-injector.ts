import type { Context, Next } from 'koa';
import { DddContext } from '../libs/ddd';

export const dependencyInjectorMiddleware = async (ctx: Context, next: Next) => {
  const { txId } = ctx.state as { txId: string };
  let context;

  try {
    context = DddContext.of(txId);
    // NOTE: 지금은 이벤트가 필요없어서 주석처리한다.
    // context.set('', '0')''
    ctx.state.context = context;

    await next();
  } finally {
    if (context) {
      context.dispose();
    }
  }
};
