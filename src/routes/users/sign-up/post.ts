import * as Router from '@koa/router';
import type { DddContext } from '../../../libs/ddd';
import { UserService } from '../../../services/users/application/server';

const router = new Router();

router.post('/users/sign-up', async (ctx) => {
  const { context } = ctx.state as { context: DddContext };

  const userService = context.get(UserService);

  const a = userService.signup();

  ctx.body = a;
});

export default router;
