import authConfig from '@config/auth.config';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from '@users/user.dto';
import { UserService } from '@users/user.service';
import { I18NException } from '@utils/exception';
import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TwoFactorService } from './2FA/2fa.service';
import { AuthBodyDto, TokenDto } from './dto/auth.dto';
import { User, User as UserDto, USER_STATUS } from '@prisma/client';
import { AccessToken, RefreshToken } from './dto/token.type';
import { sign, verify } from 'jsonwebtoken';

export enum TokenType {
  ACCESS = 'ACCESS',
  REFRESH = 'ACCESS',
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private config: ConfigType<typeof authConfig>,
    private usersService: UserService,
    private twoFactorService: TwoFactorService,
  ) {}

  async login(credentials: AuthBodyDto): Promise<TokenDto> {
    const payload = await this.authUser(credentials);
    return {
      access_token: this.generateAccessToken(payload),
      refresh_token: this.generateRefreshToken(payload),
    };
  }

  async register(user: UserCreateDto) {
    return this.usersService.create(user);
  }

  async refreshToken(
    accesToken: string,
    refreshToken: string,
    askedCompanyId?: number,
  ): Promise<TokenDto> {
    // Check the validity of the refresh token

    if (!this.config.jwtPublicKey) {
      console.error('JWT_PUBLIC_KEY is missing');
      throw new I18NException(
        'UNKNOWN_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Your request could not be processed',
      );
    }

    const dataAccessToken = verify(accesToken, this.config.jwtPublicKey, {
      algorithms: ['RS256'],
      ignoreExpiration: true,
    }) as AccessToken;

    const dataRefreshToken = verify(refreshToken, this.config.jwtPublicKey, {
      algorithms: ['RS256'],
    }) as RefreshToken;
    if (dataRefreshToken.tokenType != TokenType.REFRESH) {
      throw new I18NException(
        'INVALID_REFRESH_TOKEN',
        HttpStatus.BAD_REQUEST,
        'Invalid refresh token',
      );
    }

    const user = await this.usersService.findById(dataRefreshToken.user.id);

    if (dataRefreshToken.twoFactorLogged || dataRefreshToken.emailLogged) {
      this.verifyUserStatus(user);
    }

    let companyId = dataAccessToken.companyId;
    if (askedCompanyId) {
      companyId = askedCompanyId;
    }
    if (!(await this.usersService.userHasCompany(user.id, companyId))) {
      companyId = 0;
    }

    return {
      access_token: this.generateAccessToken({
        ...dataRefreshToken,
        user,
        companyId,
      }),
      refresh_token: refreshToken,
    };
  }

  generateAccessToken(payload: {
    user: User;
    twoFactorLogged: boolean;
    emailLogged: boolean;
    companyId: number;
  }): string {
    if (!this.config.jwtPrivateKey) {
      console.error('Missing JWT_PRIVATE_KEY');
      throw new I18NException(
        'UNKNOWN_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Your request could not be processed',
      );
    }

    return sign(
      {
        tokenType: TokenType.ACCESS,
        twoFactorLogged: payload.twoFactorLogged,
        emailLogged: payload.emailLogged,
        // User data
        user: {
          id: payload.user.id,
          firstname: payload.user.firstname,
          lastname: payload.user.lastname,
          email: payload.user.email,
          twoFactorVerified: payload.user.twoFactorVerified,
          emailVerified: payload.user.emailVerified,
          role: payload.user.role,
          status: payload.user.status,
        },
        companyId: payload.companyId,
      },
      this.config.jwtPrivateKey,
      {
        algorithm: 'RS256',
        expiresIn: this.config.accessExpireIn,
      },
    );
  }

  generateRefreshToken(payload: {
    user: User;
    twoFactorLogged: boolean;
    emailLogged: boolean;
    companyId: number;
  }): string {
    if (!this.config.jwtPrivateKey) {
      console.error('Missing JWT_PRIVATE_KEY');
      throw new I18NException(
        'UNKNOWN_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Your request could not be processed',
      );
    }

    return sign(
      {
        tokenType: TokenType.REFRESH,
        twoFactorLogged: payload.twoFactorLogged,
        emailLogged: payload.emailLogged,
        user: {
          id: payload.user.id,
          role: payload.user.role,
          status: payload.user.status,
        },
      },
      this.config.jwtPrivateKey,
      {
        algorithm: 'RS256',
        expiresIn: this.config.refreshExpiresIn,
      },
    );
  }

  private async authUser(credentials: AuthBodyDto) {
    const user = await this.usersService.findByEmail(credentials.email);

    if (!user) {
      throw new I18NException(
        'INVALID_CREDENTIALS',
        401,
        'Invalid email or password',
      );
    }

    // Verify password
    if (!bcrypt.compareSync(credentials.password, user.passwordHash)) {
      throw new I18NException(
        'INVALID_CREDENTIALS',
        401,
        'Invalid email or password',
      );
    }

    const response = {
      user,
      twoFactorLogged: false,
      emailLogged: false,
      companyId: user.defaultCompany,
    };

    if (credentials.twoFactorToken || credentials.emailCode) {
      this.verifyUserStatus(user);
    }

    // Verify 2Fa if exist
    if (credentials.twoFactorToken) {
      await this.twoFactorService.verifyTokenOrThrow(
        user,
        credentials.twoFactorToken,
      );
      response.twoFactorLogged = true;
    }

    // Verify email code if exist
    if (credentials.emailCode) {
      await this.usersService.verifyEmailCodeOrThrow(
        user.id,
        credentials.emailCode,
      );
      response.emailLogged = true;
    }

    return response;
  }

  /**
   * Only Verified user can acces to the upgraded JWT and so the whole app
   */
  verifyUserStatus(user: UserDto) {
    if (user.status === USER_STATUS.REGISTRATION_IN_PROGRESS) {
      throw new I18NException(
        'UNVERIFIED_USER',
        HttpStatus.FORBIDDEN,
        'Cant do this operation with unverified user',
      );
    } else if (user.status === USER_STATUS.BANNED) {
      throw new I18NException(
        'BANNED_USER',
        HttpStatus.FORBIDDEN,
        'This user is not allowed to do that',
      );
    }
  }
}
