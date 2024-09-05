import 'reflect-metadata';
import * as Koa from 'koa';
import { docs } from './config';
import { datasource } from './databases/mysql';
import { dependencyInjectorMiddleware, uuidMiddleware } from './middlewares';
import { globalRouter } from './routes';

(async () => {
  await datasource.initialize();

  const app = new Koa();

  // NOTE: middlewares
  app.use(uuidMiddleware);
  app.use(dependencyInjectorMiddleware);

  // NOTE: routes
  app.use(globalRouter.middleware());

  app.listen(docs.server.port, () => {
    console.log(`Server is running on ${docs.server.port}. 😘`);
  });
})();
