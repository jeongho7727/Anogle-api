import type { Context, Next } from 'koa';

export const requestLoggerMiddleware = async (ctx: Context, next: Next) => {
  await next();
};
