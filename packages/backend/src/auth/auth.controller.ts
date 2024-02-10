import { UserCreateDto } from '@users/user.dto';
import { I18NResponse } from '@utils/response.dto';
import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import {
  AuthBodyDto,
  ForgotPasswordDto,
  RecoverPasswordDto,
  RefreshTokenDto,
  TokenDto,
} from './dto/auth.dto';
import { AuthService } from './auth.service';
import { UserService } from '@users/user.service';
import { RateLimitInterceptor } from '@utils/ratelimit.interceptor';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login request, you will obtain a Bearer token',
  })
  @ApiBody({
    type: AuthBodyDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
    description: 'Login success, the body contains the new Bearer token',
  })
  async login(@Body() body: AuthBodyDto): Promise<I18NResponse<TokenDto>> {
    return new I18NResponse(
      'LOGIN_SUCCESS',
      await this.authService.login(body),
    );
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: UserCreateDto,
  })
  @ApiOperation({
    summary: 'Register a new user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
    description: 'User created',
  })
  @ApiBadRequestResponse({
    type: I18NResponse,
    description: 'Unable to create the user',
  })
  async register(@Body() user: UserCreateDto): Promise<I18NResponse<string>> {
    await this.authService.register(user);
    return new I18NResponse<string>(
      'USER_CREATED',
      'User created',
      HttpStatus.OK,
    );
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: RefreshTokenDto,
  })
  @ApiOperation({
    summary: 'Genererate a new access token from a refresh token',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
    description: 'Token refreshed',
  })
  async refreshToken(
    // @todo faire un DTO
    @Body()
    body: {
      accessToken: string;
      refreshToken: string;
      askedCompanyId?: number;
    },
  ): Promise<I18NResponse<TokenDto>> {
    const response = await this.authService.refreshToken(
      body.accessToken,
      body.refreshToken,
      body.askedCompanyId,
    );
    return new I18NResponse('TOKEN_REFRESHED', response);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Send a password reset code to the user by email',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
  })
  @ApiBody({
    type: ForgotPasswordDto,
  })
  @UseInterceptors(new RateLimitInterceptor())
  async forgotPassword(@Body() input: ForgotPasswordDto) {
    this.userService
      .createForgotPasswordRequest(input.email)
      .catch((e) => console.error(`Forgot password ${input.email}: ${e}`));
    return new I18NResponse(
      'RESET_REQUEST_SENT',
      'Reset password request sent if user exist',
    );
  }

  @Post('recover-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Put new password with recover token received by email',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
  })
  @ApiBody({
    type: RecoverPasswordDto,
  })
  @UseInterceptors(new RateLimitInterceptor())
  async recoverPassword(@Body() input: RecoverPasswordDto) {
    await this.userService.recoverPassword(input.token, input.newPassword);
    return new I18NResponse('OK');
  }
}
