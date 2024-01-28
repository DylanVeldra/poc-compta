import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { USER_ROLE } from '@prisma/client';
import { I18NException } from '@utils/exception';
import { Observable } from 'rxjs';
import { UserPayloadDto } from './dto/auth.dto';

/**
 * @todo à faire
 * @deprecated
 */
type Payload = UserPayloadDto;
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    return true;
  }

  handleRequest<Payload>(_, user: UserPayloadDto): Payload {
    if (user.role !== USER_ROLE.ADMIN) {
      throw new I18NException(
        'NOT_AUTHORIZED',
        HttpStatus.FORBIDDEN,
        'Only an admin can access this route',
      );
    }
    return user as any as Payload;
  }
}
