import * as Router from '@koa/router';
import usersRoutes from './users';

export const globalRouter = new Router();

globalRouter.get('/ping', (ctx) => {
  ctx.body = 'pong';
});

globalRouter.use(...usersRoutes.map((router) => router.routes()));
