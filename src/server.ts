import 'reflect-metadata';
import * as Koa from 'koa';
import KoaBody, { koaBody } from 'koa-body';
import * as GracefulShutdown from 'http-graceful-shutdown';
import { datasource } from './databases/mysql';
import { dependencyInjectorMiddleware, uuidMiddleware } from './middlewares';
import { globalRouter } from './routes';
import { docs } from './config';
import { requestLoggerMiddleware } from './middlewares/request-logger';

// NOTE: 옮기자

(async () => {
  await datasource.initialize();

  const app = new Koa();

  app.use(uuidMiddleware);
  app.use(requestLoggerMiddleware);

  app.use(dependencyInjectorMiddleware);
  app.use(koaBody({ multipart: true }));

  // NOTE: routes (Don't touch.)
  app.use(globalRouter.middleware());

  const server = app.listen(docs.server.port, () => {
    console.log(`server is running on ${docs.server.port}`);
  });

  GracefulShutdown(server, {
    onShutdown: async () => {
      await datasource.destroy();
    },
    finally: async () => {
      console.log('bye👋');
      process.exit();
    },
  });
})();
