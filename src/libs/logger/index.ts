import type { Context } from 'koa';
import * as winston from 'winston';

export const logger = winston.createLogger({
  transports: new winston.transports.Console(),
});

export function getLoggingContext(ctx: Context) {
  return {
    txId: ctx.state.txId,
  };
}
