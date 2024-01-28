import { EmailService } from '@email/email.service';
import { RegistrationAcceptedTemplate } from '@email/templates/register-accepted';
import { RegistrationRejectedTemplate } from '@email/templates/register-rejected';
import { HttpStatus, Injectable } from '@nestjs/common';
import { USER_STATUS } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { I18NException } from '@utils/exception';
import { DateTime } from 'luxon';
import { UserService } from './user.service';

@Injectable()
export class RegisterService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private emailService: EmailService,
  ) {}

  async changeRegistrationStatus(userId: number, status: USER_STATUS) {
    const user = await this.userService.findById(userId);
    if (
      status === USER_STATUS.ALLOWED &&
      (!user.emailVerified || !user.twoFactorVerified)
    ) {
      throw new I18NException(
        'CANT_REGISTER_UNVERIFIED_USER',
        HttpStatus.FORBIDDEN,
        'Cant register user with unverified email or 2FA',
      );
    }
    const userUpdated = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        status,
      },
    });

    if (userUpdated.status === USER_STATUS.ALLOWED) {
      await this.emailService.sendTemplatedEmail(
        user.email,
        new RegistrationAcceptedTemplate({
          mediaUrl: `${process.env.FRONT_OFFICE_BASE_URL}/images/emails`,
          date: DateTime.fromJSDate(userUpdated.registerDate),
          antiPhishingCode: user.antiPhishingCode!,
        }),
      );
    } else if (userUpdated.status === USER_STATUS.BANNED) {
      await this.emailService.sendTemplatedEmail(
        user.email,
        new RegistrationRejectedTemplate({
          mediaUrl: `${process.env.FRONT_OFFICE_BASE_URL}/images/emails`,
          date: DateTime.fromJSDate(userUpdated.registerDate),
          antiPhishingCode: user.antiPhishingCode!,
        }),
      );
    } else {
      throw new I18NException(
        'CANT_CHANGE_REGISTRATION_STATUS',
        HttpStatus.FORBIDDEN,
        'Cant change registration status',
      );
    }

    return userUpdated;
  }
}
