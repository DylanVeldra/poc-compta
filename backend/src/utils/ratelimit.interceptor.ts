import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  HttpStatus,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { rateLimit } from 'utils-decorators';
import { I18NException } from './exception';

@Injectable()
export class RateLimitInterceptor implements NestInterceptor {
  @rateLimit({
    allowedCalls: 1,
    timeSpanMs: 1000 * 5, // 5 seconds
    keyResolver: (context: ExecutionContext) => {
      const request = context.switchToHttp().getRequest();
      return request?.user?.id || request.ip;
    },
    exceedHandler: () => {
      throw new I18NException(
        'TOO_MANY_REQUESTS',
        HttpStatus.TOO_MANY_REQUESTS,
        'Please wait 5 seconds',
      );
    },
  })
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle();
  }
}
