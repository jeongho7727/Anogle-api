import * as Router from '@koa/router';
import type { Context } from 'koa';
import type { DddContext } from '../../../libs/ddd';
import { AttendanceService } from '../../../services/attendance/application/service';

const router = new Router();

router.post('/users/attendances', async (ctx: Context) => {
  const { context } = ctx.state as { context: DddContext };

  const attendanceService = context.get(AttendanceService);

  await attendanceService.register();

  ctx.status = 201;
  ctx.body = {};
});

export default router;
