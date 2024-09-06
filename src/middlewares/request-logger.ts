import type { Context, Next } from 'koa';
import { getLoggingContext, logger } from '../libs/logger';

export const requestLoggerMiddleware = async (ctx: Context, next: Next) => {
  const start = Date.now();

  try {
    await next();
  } finally {
    const requestDuration = Date.now() - start;
    logger
      .child(getLoggingContext(ctx))
      .info(`[${ctx.method}-${ctx.state.txId}] (${requestDuration}ms)`);
  }
};
