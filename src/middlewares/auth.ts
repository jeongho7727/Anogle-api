import type { Context, Next } from 'koa';
import { verify } from 'jsonwebtoken';
import type { DddContext } from '../libs/ddd';
import { UserRepository } from '../services/users/infrastructure/repository';
import { FilteredUserSpec } from '../services/users/domain/specs';
import { docs } from '../config';

export const authMiddleware = async (ctx: Context, next: Next) => {
  const accessToken = ctx.request.headers['authorization'] || '';

  if (!accessToken) {
    // TODO: 에러 인증 오류
  }

  const decoded = verify(accessToken, docs.jwtSecret) as { userId: number };

  const { context } = ctx.state as { context: DddContext };
  const userRepository = context.get(UserRepository);

  try {
    const user = await userRepository.findSatisfying(new FilteredUserSpec({ id: decoded.userId }));

    await next();
  } catch (err) {}
};
