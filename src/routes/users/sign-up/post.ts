import * as Router from '@koa/router';
import type { DddContext } from '../../../libs/ddd';
import { UserService } from '../../../services/users/application/server';

const router = new Router();

router.post('/users/sign-up', async (ctx) => {
  const { context } = ctx.state as { context: DddContext };

  const userService = context.get(UserService);

  await userService.signup();

  ctx.body = 'hi';
});

export default router;
