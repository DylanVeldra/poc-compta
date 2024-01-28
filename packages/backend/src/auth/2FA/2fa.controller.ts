import { UserService } from '@users/user.service';
import { I18NException } from '@utils/exception';
import { I18NResponse } from '@utils/response.dto';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { TwoFactorService } from './2fa.service';
import { CodeDto, PassphraseDto } from '../dto/verification.dto';
import { PrismaService } from '@prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from '@users/user.dto';
import { Base, CodeGenerator } from '@utils/code.generator';
import { USER_STATUS } from '@prisma/client';
import { EmailService } from '@email/email.service';
import { RegisterConfirmationTemplate } from '@email/templates/register-confirmation';
import { DateTime } from 'luxon';
import { RequestContext } from '@utils/types';
import { REQUEST } from '@nestjs/core';
@Controller('auth/2fa')
@ApiBearerAuth()
@ApiTags('2FA')
export class TwoFactorController {
  constructor(
    @Inject(REQUEST) private readonly requestContext: RequestContext,
    private twoFaService: TwoFactorService,
    private userService: UserService,
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('generate')
  @ApiOperation({
    summary: 'Generate a new 2FA secret and send the QR code url to the user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
  })
  async generateSecret(): Promise<I18NResponse<string>> {
    const dbUser = await this.userService.findById(
      this.requestContext.context.user.id,
    );
    if (dbUser.twoFactorVerified === true) {
      throw new I18NException(
        '2FA_ALREADY_SET',
        HttpStatus.UNAUTHORIZED,
        'User cannot enable 2FA twice',
      );
    }
    const result = await this.twoFaService.generateSecret(dbUser);
    return new I18NResponse('2FA_SECRET_GENERATED', result.otpAuthUrl);
  }

  @UseGuards(JwtAuthGuard)
  @Post('verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Verify the 2FA code. And finish the 2FA setup',
  })
  @ApiBody({
    type: CodeDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
  })
  async verifyAndEnable2FA(
    @Body() body: CodeDto,
  ): Promise<I18NResponse<string>> {
    const dbUser = await this.userService.findById(
      this.requestContext.context.user.id,
    );
    if (dbUser.twoFactorVerified === true) {
      throw new I18NException(
        '2FA_ALREADY_VERIFIED',
        HttpStatus.UNAUTHORIZED,
        'User cannot verify 2FA twice',
      );
    }
    await this.twoFaService.verifyTokenOrThrow(dbUser, body.code);

    // Generate backup passphrase
    const backupPassphrase = CodeGenerator.generate(64, Base.BASE32);
    const backupPassphraseHash = bcrypt.hashSync(backupPassphrase, 10);

    const userObj = await this.prisma.user.update({
      where: {
        id: dbUser.id,
      },
      data: {
        twoFactorVerified: true,
        twoFactorRecoverHash: backupPassphraseHash,
      },
    });

    if (userObj.status === USER_STATUS.REGISTRATION_IN_PROGRESS) {
      await this.emailService.sendTemplatedEmail(
        this.requestContext.context.user.email,
        new RegisterConfirmationTemplate({
          mediaUrl: `${process.env.FRONT_OFFICE_BASE_URL}/images/emails`,
          antiPhishingCode: userObj.antiPhishingCode!,
          date: DateTime.now(),
        }),
      );
    }

    return new I18NResponse('2FA_ENABLED', backupPassphrase);
  }

  @UseGuards(JwtAuthGuard)
  @Post('recover')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Verify the 2FA code. And finish the 2FA setup',
  })
  @ApiBody({
    type: PassphraseDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
  })
  async reset2FA(@Body() body: PassphraseDto): Promise<I18NResponse<string>> {
    if (this.requestContext.context.twoFactorLogged === true) {
      throw new I18NException(
        '2FA_ALREADY_LOGGED',
        HttpStatus.UNAUTHORIZED,
        'User cannot reset 2FA when it is logged with',
      );
    }

    await this.twoFaService.reset2FA(
      this.requestContext.context.user.id,
      body.passphrase,
    );

    return new I18NResponse(
      '2FA_RESET',
      'Two factor authentication has been reset',
    );
  }
}
