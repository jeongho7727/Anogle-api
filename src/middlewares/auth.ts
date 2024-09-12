import type { Context, Next } from 'koa';
import { verify } from 'jsonwebtoken';
import type { DddContext } from '../libs/ddd';
import { UserRepository } from '../services/users/infrastructure/repository';
import { FilteredUserSpec } from '../services/users/domain/specs';
import { docs } from '../config';
import { badRequest, unauthorized } from '@hapi/boom';

export const authMiddleware = async (ctx: Context, next: Next) => {
  const accessToken = ctx.request.headers['authorization'] || '';

  if (!accessToken) {
    // TODO: 에러 인증 오류
    throw unauthorized('There is no access token.');
  }

  const decoded = verify(accessToken, docs.jwtSecret) as { userId: number };

  const { context } = ctx.state as { context: DddContext };
  const userRepository = context.get(UserRepository);

  const user = await userRepository.findSatisfying(new FilteredUserSpec({ id: decoded.userId }));

  if (!user) {
    throw badRequest('No user.', { message: 'No user' });
  }

  ctx.state.userId = decoded.userId;
  await next();
};
