import authConfig from '@config/auth.config';
import { I18NException } from '@utils/exception';
import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { User } from '@prisma/client';
import { authenticator } from 'otplib';
import { PrismaService } from '@prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserService } from '@users/user.service';

@Injectable()
export class TwoFactorService {
  constructor(
    @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
    private prisma: PrismaService,
    private userService: UserService,
  ) {
    authenticator.options = { window: config.twoFaWindowStep };
  }

  async verifyTokenOrThrow(user: User, token: string) {
    if (!user.twoFactorSecret) {
      throw new I18NException(
        '2FA_SECRET_NOT_GENERATED',
        HttpStatus.FORBIDDEN,
        'Create a secret first',
      );
    }
    const verified = authenticator.verify({
      token,
      secret: user.twoFactorSecret,
    });

    if (!verified) {
      throw new I18NException(
        '2FA_TOKEN_INVALID',
        HttpStatus.UNAUTHORIZED,
        'Invalid token',
      );
    }
  }

  async reset2FA(userId: number, passphrase: string) {
    const user = await this.userService.findById(userId);

    // If 2FA isn't enabled
    if (user.twoFactorVerified !== true) {
      throw new I18NException(
        '2FA_NOT_VERIFIED',
        HttpStatus.UNAUTHORIZED,
        'Two factor not verified',
      );
    }

    // Check passphrase
    const result = bcrypt.compareSync(passphrase, user.twoFactorRecoverHash);
    if (result !== true) {
      throw new I18NException(
        '2FA_PASSPHRASE_INVALID',
        HttpStatus.UNAUTHORIZED,
        'Invalid passphrase',
      );
    }

    // reset 2FA
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        twoFactorVerified: false,
        twoFactorSecret: null,
        twoFactorRecoverHash: null,
      },
    });
  }

  async generateSecret(user: User) {
    const secret = authenticator.generateSecret();
    const otpAuthUrl = authenticator.keyuri(
      user.email,
      this.config.applicationName,
      secret,
    );

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        twoFactorSecret: secret,
      },
    });

    return {
      secret,
      otpAuthUrl,
    };
  }
}
