import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { USER_ROLE } from '@prisma/client';
import {
  IsNumber,
  IsEmail,
  IsString,
  IsOptional,
  Length,
  Matches,
  IsEnum,
} from 'class-validator';

export class UserPayloadDto {
  @ApiProperty({
    example: 7,
  })
  @IsNumber()
  readonly id: number;

  @ApiProperty({
    example: 'johndoe@mail.com',
  })
  @IsEmail({ allow_utf8_local_part: false })
  readonly email: string;

  @ApiProperty({
    enum: USER_ROLE,
    example: USER_ROLE.ADMIN,
  })
  @IsEnum(USER_ROLE)
  readonly role: USER_ROLE;
}
export class AuthBodyDto {
  @ApiProperty({
    example: 'johndoe@mail.com',
    description: 'The email of the user',
  })
  @IsEmail({ allow_utf8_local_part: false })
  readonly email: string;

  @ApiProperty({
    example: 'strongpassword',
    description: 'The password of the user',
  })
  @IsString()
  readonly password: string;

  @IsOptional()
  @IsString()
  @Length(6, 6)
  @ApiPropertyOptional({
    example: '123456',
    description: 'The two factor code',
  })
  readonly twoFactorToken?: string;

  @IsOptional()
  @Length(6, 6)
  @IsString()
  @ApiPropertyOptional({
    example: '123456',
    description: 'The code received by email',
  })
  readonly emailCode?: string;

  //@TODO companyId optional sinon use user.companyIdDefault (default 0)
}

export class TokenDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIxzI1NiInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTU0YzI4MDViNTJkhmYzM3ODRvNTIiLCJ1c2VybmFtZSI6ImdhYnJpZWwiLCJpYXQiOjE2MzI5OTE1MjksImV4cCI6MbYzODE3NTUyOX0.GRr2rD3_dB625Cn4g2bqqb9HsMFbq3zgkmoQkyURB1w',
    description: 'JWT token, as Bearer format',
  })
  @IsString()
  readonly access_token: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIxzI1NiInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTU0YzI4MDViNTJkhmYzM3ODRvNTIiLCJ1c2VybmFtZSI6ImdhYnJpZWwiLCJpYXQiOjE2MzI5OTE1MjksImV4cCI6MbYzODE3NTUyOX0.GRr2rD3_dB625Cn4g2bqqb9HsMFbq3zgkmoQkyURB1w',
    description: 'Refresh token, use only to get a new access token',
  })
  @IsString()
  readonly refresh_token: string;
}

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'johndoe@mail.com',
    description: 'The email of the user',
  })
  @IsEmail({ allow_utf8_local_part: false })
  readonly email: string;
}

export class RecoverPasswordDto {
  @ApiProperty({
    example: '624276f3-0f3c-489f-a2e9-48f7a611556f',
    description: 'The token received by email',
  })
  @IsString()
  @Length(36, 36) // Length of uuid.v4()
  readonly token: string;

  @IsString()
  @Matches('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$', '', {
    message:
      'Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  @Length(8, 256)
  @ApiProperty({
    example: 'strongpassword',
    description: 'The new password',
  })
  readonly newPassword: string;
}

export class RefreshTokenDto {
  @IsString()
  readonly token: string;
}
