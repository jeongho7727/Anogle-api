import 'reflect-metadata';
import * as Koa from 'koa';
import { docs } from './config';
import { datasource } from './databases/mysql';
import { uuidMiddleware } from './middlewares';

(async () => {
  await datasource.initialize();

  const app = new Koa();

  // NOTE: middlewares
  app.use(uuidMiddleware);

  app.listen(docs.server.port, () => {
    console.log(`Server is running on ${docs.server.port}. 😘`);
  });
})();
