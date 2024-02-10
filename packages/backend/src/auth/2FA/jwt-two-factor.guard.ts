import { TokenType } from '@auth/auth.service';
import { AccessToken } from '@auth/dto/token.type';
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

@Injectable()
export class JwtTwoFactorGuard implements CanActivate {
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
      throw new I18NException(
        'INVALID_TOKEN_TYPE',
        HttpStatus.BAD_REQUEST,
        'Invalid token type',
      );
    }

    if (dataToken.user.twoFactorVerified !== true) {
      throw new I18NException(
        '2FA_NOT_VERIFIED',
        HttpStatus.UNAUTHORIZED,
        'Two factor not verified',
      );
    }

    if (dataToken.twoFactorLogged !== true) {
      throw new I18NException(
        'USER_NOT_LOGGED_WITH_2FA',
        HttpStatus.UNAUTHORIZED,
        "The user wasn't logged with 2FA",
      );
    }

    if (dataToken.emailLogged !== true) {
      throw new I18NException(
        'USER_NOT_LOGGED_WITH_EMAIL_CODE',
        HttpStatus.UNAUTHORIZED,
        "The user wasn't logged with email verification code",
      );
    }

    request.context = {
      twoFactorLogged: dataToken.twoFactorLogged,
      emailLogged: dataToken.emailLogged,
      user: dataToken.user,
      companyId: dataToken.companyId,
      reqIq: 'todo',
    };

    return true;
  }
}
