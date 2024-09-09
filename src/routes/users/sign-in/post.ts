import * as Router from '@koa/router';
import type { Context } from 'koa';
import * as Joi from 'joi';
import type { DddContext } from '../../../libs/ddd';
import { UserService } from '../../../services/users/application/service';

const bodySchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).required();

const router = new Router();

router.post('/users/sign-in', async (ctx: Context) => {
  const { context } = ctx.state as { context: DddContext };
  const {
    value: { email, password },
  } = bodySchema.validate(ctx.request.body) as {
    value: { email: string; password: string };
  };

  const userService = context.get(UserService);

  const token = await userService.signIn({ email, password });

  ctx.body = { data: token };
});

export default router;
