import * as bcrypt from 'bcrypt';
import { PrismaService } from '@prisma/prisma.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import {
  User,
  EMAIL_VERIFICATION_STATUS,
  USER_STATUS,
  Prisma,
} from '@prisma/client';
import { formatNumber } from 'libphonenumber-js';
import { UpdateUserDto, UserCreateDto, UserDto } from './user.dto';
import { Base, CodeGenerator } from '@utils/code.generator';
import { EmailService } from '@email/email.service';
import { I18NException } from '@utils/exception';
import { VerificationCodeTemplate } from '@email/templates/verification-code';
import { ForgotPasswordTemplate } from '@email/templates/reset-password';
import { LoginCodeTemplate } from '@email/templates/login-code';
import { AntiphishingService } from './antiphishing/antiphishing.service';
import { ResetPasswordTemplate } from '@email/templates/reset-password-confirmed';
import { PaginationDto } from '@utils/pipes/pagination';
import { EmailSecurityVerificationTemplate } from '@email/templates/email-security-verification';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private antiphishingService: AntiphishingService,
  ) {}

  preparePassword(input: string): string {
    // Hash password with bcrypt
    const saltRounds = 10;
    const passwordHash = bcrypt.hashSync(input, saltRounds);
    return passwordHash;
  }

  async resetPassword(userId: number, password: string) {
    const passwordHash = this.preparePassword(password);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        passwordHash,
      },
    });
  }

  async create(data: UserCreateDto): Promise<User> {
    const { password, ...userData } = data;
    const passwordHash = this.preparePassword(password);

    // Format phone number
    const formatedNumber = formatNumber(data.phoneNumber, 'INTERNATIONAL');

    return this.prisma.user.create({
      data: {
        ...userData,
        birthDate: new Date(userData.birthDate),
        passwordHash,
        phoneNumber: formatedNumber,
        ...this.antiphishingService.newRandomCode(),
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });
  }

  async findByIdWithTags(id: number) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        phoneNumber: true,
        email: true,
        birthDate: true,
        tags: {
          select: {
            tag: true,
          },
        },
      },
    });
    return user;
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
    return user;
  }

  async getAllUsers(pagination: PaginationDto, status?: USER_STATUS) {
    const filters = {
      where: {
        status: status ?? {},
      } as Prisma.UserWhereInput,
      orderBy: {
        id: 'asc',
      } as Prisma.Enumerable<Prisma.UserOrderByWithRelationInput>,
    };
    const count = await this.prisma.user.count(filters);
    const data = await this.prisma.user.findMany({
      ...pagination.prisma,
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        registerDate: true,
        status: true,
        emailVerified: true,
        twoFactorVerified: true,
        tags: {
          select: {
            tag: true,
          },
        },
      },
      ...filters,
    });
    return pagination.response(data, count);
  }

  async createForgotPasswordRequest(email: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });
    const request = await this.prisma.passwordVerificationRequest.create({
      data: {
        userId: user.id,
        token: CodeGenerator.uuid(),
        expiration: new Date(Date.now() + 1000 * 60 * 10), // 10 minutes
      },
    });
    // Send a email with the token into url
    const url = `${process.env.FRONT_OFFICE_BASE_URL}/recover-password/${request.token}`;
    await this.emailService.sendTemplatedEmail(
      user.email,
      new ForgotPasswordTemplate({
        mediaUrl: `${process.env.FRONT_OFFICE_BASE_URL}/images/emails`,
        url,
        antiPhishingCode: user.antiPhishingCode!,
      }),
    );
  }

  async recoverPassword(token: string, password: string) {
    const request =
      await this.prisma.passwordVerificationRequest.findUniqueOrThrow({
        where: {
          token,
        },
        include: {
          user: true,
        },
      });
    if (request.status !== EMAIL_VERIFICATION_STATUS.PENDING) {
      throw new I18NException(
        'TOKEN_ALREADY_USED',
        HttpStatus.BAD_REQUEST,
        'This token is already used',
      );
    }

    if (Date.now() > request.expiration.getTime()) {
      await this.prisma.passwordVerificationRequest.update({
        where: {
          token: request.token,
        },
        data: {
          status: EMAIL_VERIFICATION_STATUS.EXPIRED,
          updatedAt: new Date(),
        },
      });
      throw new I18NException(
        'VERIFICATION_EXPIRED',
        HttpStatus.PRECONDITION_FAILED,
        'Please request a new password reset',
      );
    }

    await this.resetPassword(request.userId, password);

    await this.emailService.sendTemplatedEmail(
      request.user.email,
      new ResetPasswordTemplate({
        mediaUrl: `${process.env.FRONT_OFFICE_BASE_URL}/images/emails`,
        url: `${process.env.FRONT_OFFICE_BASE_URL}/login`,
        antiPhishingCode: request.user.antiPhishingCode!,
      }),
    );

    await this.prisma.passwordVerificationRequest.update({
      where: {
        token: request.token,
      },
      data: {
        status: EMAIL_VERIFICATION_STATUS.VERIFIED,
        updatedAt: new Date(),
      },
    });
  }

  async verifyEmailCodeOrThrow(
    userId: number,
    code: string,
    accountVerification = false,
  ) {
    const user = await this.findById(userId);

    if (user.emailVerified === true && accountVerification === true) {
      throw new I18NException(
        'EMAIL_ALREADY_VERIFIED',
        HttpStatus.BAD_REQUEST,
        'Email already verified',
      );
    }

    if (user.currentEmailVerificationId === null) {
      throw new I18NException(
        'NO_PENDING_VERIFICATION',
        HttpStatus.PRECONDITION_FAILED,
        'Please request a new email verification code',
      );
    }

    const verification =
      await this.prisma.emailVerificationCode.findUniqueOrThrow({
        where: {
          id: user.currentEmailVerificationId,
        },
      });

    if (verification.status !== EMAIL_VERIFICATION_STATUS.PENDING) {
      throw new I18NException(
        'VERIFICATION_INVALID',
        HttpStatus.PRECONDITION_FAILED,
        'Please request a new email verification code',
      );
    }

    if (Date.now() > verification.expiration.getTime()) {
      await this.prisma.emailVerificationCode.update({
        where: {
          id: user.currentEmailVerificationId,
        },
        data: {
          status: EMAIL_VERIFICATION_STATUS.EXPIRED,
        },
      });
      throw new I18NException(
        'VERIFICATION_EXPIRED',
        HttpStatus.PRECONDITION_FAILED,
        'Please request a new email verification code',
      );
    }

    if (verification.code !== code) {
      if (verification.numberOfAttempts >= 3) {
        await this.prisma.emailVerificationCode.update({
          where: {
            id: user.currentEmailVerificationId,
          },
          data: {
            status: EMAIL_VERIFICATION_STATUS.ERROR,
          },
        });
        throw new I18NException(
          'TOO_MANY_ATTEMPTS',
          HttpStatus.TOO_MANY_REQUESTS,
          'Too many attempts, Please request a new email verification code',
        );
      }

      await this.prisma.emailVerificationCode.update({
        where: {
          id: user.currentEmailVerificationId,
        },
        data: {
          numberOfAttempts: verification.numberOfAttempts + 1,
        },
      });

      throw new I18NException(
        'INVALID_CODE',
        HttpStatus.BAD_REQUEST,
        'Invalid code',
      );
    }

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        emailVerified: accountVerification === true ? true : user.emailVerified,
        currentEmailVerificationId: null,
      },
    });

    await this.prisma.emailVerificationCode.update({
      where: {
        id: user.currentEmailVerificationId,
      },
      data: {
        status: EMAIL_VERIFICATION_STATUS.VERIFIED,
      },
    });
  }

  private async setupEmailVerification(user: User): Promise<string> {
    // if there are already a pending verification, cancel it
    if (user.currentEmailVerificationId !== null) {
      await this.prisma.emailVerificationCode.update({
        where: {
          id: user.currentEmailVerificationId,
        },
        data: {
          status: EMAIL_VERIFICATION_STATUS.ERROR,
        },
      });
    }

    const verificationModel = await this.prisma.emailVerificationCode.create({
      data: {
        expiration: new Date(Date.now() + 1000 * 60 * 10), // 10 minutes
        code: CodeGenerator.generate(6, Base.BASE10),
      },
    });
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        currentEmailVerificationId: verificationModel.id,
      },
    });
    return verificationModel.code;
  }

  async sendEmailVerificationCodeForRegister(userId: number) {
    const user = await this.findById(userId);
    const code = await this.setupEmailVerification(user);
    await this.emailService.sendTemplatedEmail(
      user.email,
      new VerificationCodeTemplate({
        mediaUrl: `${process.env.FRONT_OFFICE_BASE_URL}/images/emails`,
        code,
        antiPhishingCode: user.antiPhishingCode!,
      }),
    );
  }

  async sendEmailVerificationCodeForLogin(
    userId: number,
    device: string,
    ip: string,
  ) {
    const user = await this.findById(userId);
    const code = await this.setupEmailVerification(user);
    await this.emailService.sendTemplatedEmail(
      user.email,
      new LoginCodeTemplate({
        mediaUrl: `${process.env.FRONT_OFFICE_BASE_URL}/images/emails`,
        code,
        device,
        email: user.email,
        ip,
        antiPhishingCode: user.antiPhishingCode!,
      }),
    );
  }

  async sendEmailVerificationCode(userId: number, device: string, ip: string) {
    const user = await this.findById(userId);
    const code = await this.setupEmailVerification(user);
    // Send the code by mail

    await this.emailService.sendTemplatedEmail(
      user.email,
      new EmailSecurityVerificationTemplate({
        mediaUrl: `${process.env.FRONT_OFFICE_BASE_URL}/images/emails`,
        code,
        antiPhishingCode: user.antiPhishingCode!,
      }),
    );
  }

  async updateEmail(userId: number, email: string) {
    // Check if the email is already taken
    let user: User | null = null;
    try {
      user = await this.findByEmail(email);
    } catch (e) {}
    if (user !== null) {
      throw new I18NException(
        'EMAIL_ALREADY_TAKEN',
        HttpStatus.BAD_REQUEST,
        'Email already taken',
      );
    }
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email,
      },
    });
    await this.sendEmailVerificationCode(userId, '', '');
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findById(id);
      // Todo si history fees existe déjà dans la journée on l'écrase
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          firstname: updateUserDto.firstname,
          lastname: updateUserDto.lastname,
          phoneNumber: updateUserDto.phoneNumber,
          email: updateUserDto.email,
          birthDate: updateUserDto.birthDate,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  async userHasCompany(userId: number, companyId: number): Promise<Boolean> {
    return !!(await this.prisma.usersOnCompanies.findFirst({
      where: {
        userId,
        companyId,
      },
    }));
  }
}
