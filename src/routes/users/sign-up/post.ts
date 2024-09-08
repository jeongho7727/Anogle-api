import * as Router from '@koa/router';
import * as Joi from 'joi';
import type { Context } from 'koa';
import type { DddContext } from '../../../libs/ddd';
import { UserService } from '../../../services/users/application/service';

const bodySchema = Joi.object({
  email: Joi.string().required().description('가입 이메일'),
  username: Joi.string().required().email().description('사용자 이름'),
  password: Joi.string().required().description('비밀번호'),
  confirmPassword: Joi.string().required().description('재확인 비밀번호'),
}).required();

const router = new Router();

router.post('/users/sign-up', async (ctx: Context) => {
  const { context } = ctx.state as { context: DddContext };
  const {
    value: { email, username, password, confirmPassword },
  } = bodySchema.validate(ctx.request.body) as {
    value: { email: string; username: string; password: string; confirmPassword: string };
  };

  // NOTE: get Context
  const userService = context.get(UserService);

  // NOTE: service output
  await userService.signup({ email, username, password, confirmPassword });

  ctx.status = 201;
  ctx.body = {};
});

export default router;
