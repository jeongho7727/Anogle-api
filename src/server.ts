import 'reflect-metadata';
import * as Koa from 'koa';
import { datasource } from './databases/mysql';
import { dependencyInjectorMiddleware, uuidMiddleware } from './middlewares';
import { globalRouter } from './routes';

// NOTE: 옮기자

(async () => {
  await datasource.initialize();

  const app = new Koa();

  app.use(uuidMiddleware);
  app.use(dependencyInjectorMiddleware);

  // NOTE: routes (Don't touch.)
  app.use(globalRouter.middleware());

  app.listen(3000, () => {
    console.log('server is running on 3000.');
  });
})();
