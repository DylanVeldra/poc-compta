import { I18NResponse } from '@utils/response.dto';
import {
  Controller,
  UseGuards,
  HttpStatus,
  Get,
  UseInterceptors,
  Post,
  Body,
  HttpCode,
  Inject,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { UserService } from '@users/user.service';
import { RateLimitInterceptor } from '@utils/ratelimit.interceptor';
import { CodeDto } from '@auth/dto/verification.dto';
import { UserAgent } from '@utils/pipes/user-agent';
import { RealIp } from 'nestjs-real-ip';
import { RequestContext } from '@utils/types';
import { REQUEST } from '@nestjs/core';

@Controller('auth/email')
@ApiTags('Email verification')
export class EmailVerificationController {
  constructor(
    @Inject(REQUEST) private readonly requestContext: RequestContext,
    private userService: UserService,
  ) {}

  @Get('register')
  @ApiOperation({
    summary: 'Genererate a new email register process',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new RateLimitInterceptor())
  async requestEmailVerificationForRegister(
    @RealIp() ip: string,
    @UserAgent() userAgent: string,
  ): Promise<I18NResponse<string>> {
    await this.userService.sendEmailVerificationCodeForRegister(
      this.requestContext.context.user.id,
    );
    return new I18NResponse(
      'EMAIL_SENT',
      'The verification code has been sent',
    );
  }

  @Get('login')
  @ApiOperation({
    summary: 'Genererate a new email login process',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new RateLimitInterceptor())
  async requestEmailVerificationForLogin(
    @RealIp() ip: string,
    @UserAgent() userAgent: string,
  ): Promise<I18NResponse<string>> {
    await this.userService.sendEmailVerificationCodeForLogin(
      this.requestContext.context.user.id,
      userAgent,
      ip,
    );
    return new I18NResponse(
      'EMAIL_SENT',
      'The verification code has been sent',
    );
  }

  @Get('request')
  @ApiOperation({
    summary: 'Genererate 2FA verification process',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new RateLimitInterceptor())
  async requestEmailVerification(
    @RealIp() ip: string,
    @UserAgent() userAgent: string,
  ): Promise<I18NResponse<string>> {
    await this.userService.sendEmailVerificationCode(
      this.requestContext.context.user.id,
      userAgent,
      ip,
    );
    return new I18NResponse(
      'EMAIL_SENT',
      'The verification code has been sent',
    );
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Verify the code sent by email, (only for email verification)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async verifyCode(@Body() body: CodeDto): Promise<I18NResponse<string>> {
    await this.userService.verifyEmailCodeOrThrow(
      this.requestContext.context.user.id,
      body.code,
      true,
    );
    return new I18NResponse(
      'EMAIL_VERIFIED',
      'The email address has been verified',
    );
  }
}
