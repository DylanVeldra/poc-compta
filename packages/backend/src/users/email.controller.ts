import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import { I18NResponse } from '@utils/response.dto';
import { EmailChangeDto, UserDto } from './user.dto';
import { I18NException } from '@utils/exception';
import { UserService } from './user.service';
import { RequestContext } from '@utils/types';
import { REQUEST } from '@nestjs/core';

@Controller('user/email')
@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserEmailController {
  constructor(
    @Inject(REQUEST) private readonly requestContext: RequestContext,
    private userService: UserService,
  ) {}

  @Patch('change')
  @ApiOperation({
    summary: 'Change email during registration process',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
    description: 'Email change confirmation',
  })
  @ApiBody({
    type: EmailChangeDto,
    description: 'Email change request',
  })
  async changeEmail(@Body() body: EmailChangeDto) {
    if (
      this.requestContext.context.user.emailVerified ||
      this.requestContext.context.user.twoFactorVerified
    ) {
      throw new I18NException(
        'CANT_CHANGE_EMAIL_AFTER_VERIFICATION',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.userService.updateEmail(
      this.requestContext.context.user.id,
      body.email,
    );
    return new I18NResponse('OK');
  }
}
