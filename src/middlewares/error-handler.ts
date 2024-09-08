import { isBoom } from '@hapi/boom';
import type { Context } from 'koa';
import { getLoggingContext, logger } from '../libs/logger';

type CustomError = {
  statusCode: number;
  message: string;
  stack?: string;
};

export const errorHandlerMiddleware = async (ctx: Context, next: () => Promise<any>) => {
  const customError: CustomError = {
    statusCode: 500,
    message: 'An unexpected error occurred on the server.',
    stack: '',
  };

  try {
    await next();
  } catch (err) {
    // NOTE: 만약 Boom 에 의해 발생한 에러일 경우.
    if (isBoom(err)) {
      const { statusCode, message } = err.output.payload;

      customError.statusCode = statusCode;
      customError.message = message;
      customError.stack = err.stack;
    }

    logger.child(getLoggingContext(ctx)).error(customError.message);

    ctx.status = customError.statusCode;
    ctx.body = { errorMessage: customError.message };
  }
};
