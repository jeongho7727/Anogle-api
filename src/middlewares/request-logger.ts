import type { Context, Next } from 'koa';
import { logger } from '../libs/logger';

export const requestLoggerMiddleware = async (ctx: Context, next: Next) => {
  logger.info(`${ctx.URL}`);
  await next();
};
