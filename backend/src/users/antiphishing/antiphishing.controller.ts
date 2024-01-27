import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { I18NResponse } from '@utils/response.dto';
import { JwtTwoFactorGuard } from '@auth/2FA/jwt-two-factor.guard';
import { AntiphishingService } from './antiphishing.service';
import { UserDto } from '@users/user.dto';
import { UpdateAntiphishingCodeDto } from './dto/antiphishing.dto';
import { TwoFactorService } from '@auth/2FA/2fa.service';
import { UserService } from '@users/user.service';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from '@utils/types';

@Controller('user/antiphishing')
@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtTwoFactorGuard)
export class AntiphishingController {
  constructor(
    @Inject(REQUEST) private readonly requestContext: RequestContext,
    private antiphishingService: AntiphishingService,
    private twoFactorService: TwoFactorService,
    private userService: UserService,
  ) {}

  @Get('retrieve')
  @ApiOperation({
    summary: 'Get antiphishing code from logged user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
    description: 'The antiphishing code',
  })
  async getAntiphishingCode(user: UserDto) {
    const code = await this.antiphishingService.getByUserId(user.id);
    return new I18NResponse('OK', code!.antiPhishingCode);
  }

  @Put()
  @ApiOperation({
    summary: 'Update antiphishing code for logged user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
    description: 'Change confirmation',
  })
  @ApiBody({
    type: UpdateAntiphishingCodeDto,
  })
  async updateAntiphishingCode(@Body() code: UpdateAntiphishingCodeDto) {
    const userDao = await this.userService.findById(
      this.requestContext.context.user.id,
    );
    await this.twoFactorService.verifyTokenOrThrow(
      userDao,
      code.twoFactorToken!,
    );
    await this.userService.verifyEmailCodeOrThrow(
      this.requestContext.context.user.id,
      code.emailCode!,
    );
    await this.antiphishingService.setCode(
      this.requestContext.context.user.id,
      code.antiPhishingCode,
    );
    return new I18NResponse('OK');
  }
}
