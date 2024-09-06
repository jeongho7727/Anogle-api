import * as Router from '@koa/router';
import type { Context } from 'koa';
import type { DddContext } from '../../../libs/ddd';
import { UserService } from '../../../services/users/application/service';

const router = new Router();

router.post('/users/sign-up', async (ctx: Context) => {
  const { context } = ctx.state as { context: DddContext };

  const userService = context.get(UserService);

  await userService.signup();
  ctx.body = {};
});

export default router;
