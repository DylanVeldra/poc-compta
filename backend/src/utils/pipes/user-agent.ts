import * as useragent from 'express-useragent';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserAgent = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userAgent = useragent.parse(request.get('User-Agent'));
    return `${userAgent.platform}, ${userAgent.browser}`;
  },
);
