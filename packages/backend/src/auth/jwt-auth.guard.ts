import authConfig from '@config/auth.config';
import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { I18NException } from '@utils/exception';
import { extractTokenFromBearer } from '@utils/functions/extractTokenFromBearer';
import { RequestContext } from '@utils/types';
import { verify } from 'jsonwebtoken';
import { TokenType } from './auth.service';
import { AccessToken } from './dto/token.type';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(authConfig.KEY)
    private readonly auth: ConfigType<typeof authConfig>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<RequestContext>();
    const token = extractTokenFromBearer(request.headers.authorization);

    if (!this.auth.jwtPublicKey) {
      console.error('JWT_PUBLIC_KEY is missing');
      throw new I18NException(
        'UNKNOWN_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Your request could not be processed',
      );
    }

    const dataToken = verify(token, this.auth.jwtPublicKey, {
      algorithms: ['RS256'],
    }) as AccessToken;

    if (dataToken.tokenType !== TokenType.ACCESS) {
      throw new I18NException('INVALID_TOKEN_TYPE', 401, 'Invalid token type');
    }

    console.log(dataToken);

    request.context = {
      twoFactorLogged: dataToken.twoFactorLogged,
      emailLogged: dataToken.emailLogged,
      user: dataToken.user,
      companyId: dataToken.companyId,
      reqIq: 'todo',
    };

    console.log(request.context);

    return true;
  }
}
