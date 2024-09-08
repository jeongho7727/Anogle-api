import * as Router from '@koa/router';
import * as Joi from 'joi';
import type { Context } from 'koa';
import type { DddContext } from '../../../libs/ddd';
import { UserService } from '../../../services/users/application/service';

const bodySchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
}).required();

const router = new Router();

router.post('/users/sign-up', async (ctx: Context) => {
  const { context } = ctx.state as { context: DddContext };
  const {
    value: { username, password, confirmPassword },
  } = bodySchema.validate(ctx.request.body) as {
    value: { username: string; password: string; confirmPassword: string };
  };

  // NOTE: get Context
  const userService = context.get(UserService);

  // NOTE: service output
  await userService.signup({ username, password, confirmPassword });

  ctx.status = 201;
  ctx.body = {};
});

export default router;
