import { TokenType } from '@auth/auth.service';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsValidBirthDate } from '@utils/validators/birth-date.validator';
import {
  IsString,
  Length,
  IsPhoneNumber,
  IsEmail,
  Matches,
  IsDateString,
  IsOptional,
  IsBoolean,
  Equals,
  IsNumber,
  IsEnum,
} from 'class-validator';

export class UserCreateDto {
  @IsEmail({ allow_utf8_local_part: false })
  @ApiProperty({
    example: 'johndoe@email.com',
    description: 'The email of the user',
  })
  readonly email: string;

  @IsString()
  @Matches('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$', '', {
    message:
      'Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  @Length(8, 256)
  @ApiProperty({
    example: 'strongpassword',
    description: 'The password of the user',
  })
  readonly password: string;

  @IsString()
  @Length(2, 256)
  @ApiProperty({
    example: 'John',
    description: 'Firstname of the user',
  })
  readonly firstname: string;

  @IsString()
  @Length(2, 256)
  @ApiProperty({
    example: 'Doe',
    description: 'Lastname of the user',
  })
  readonly lastname: string;

  @IsPhoneNumber()
  @ApiProperty({
    example: '+33 6 12 34 56 78',
    description: 'The phone number of the user',
  })
  readonly phoneNumber: string;

  @IsDateString()
  @IsValidBirthDate()
  @ApiProperty({
    example: '1999-12-15',
    description: 'The birthdate of the user',
  })
  readonly birthDate: string;

  @ApiProperty({
    example: true,
    description: 'The user can subscribe or not to eovo newsletter',
  })
  @IsBoolean()
  readonly optIn: boolean;

  @ApiProperty({
    example: true,
    description: 'The user had accept the terms of service',
  })
  @Equals(true, {
    message: 'The terms of service must be ticked before moving forward.',
  })
  readonly termsOfService: boolean;

  @IsOptional()
  @Length(2, 64) // https://limits.tginfo.me/en
  @ApiPropertyOptional({
    example: 'cameraman',
    description: 'The telegram username of the user',
  })
  readonly telegramAccount?: string;
}

export class UserDto {
  @IsEnum(TokenType)
  readonly tokenType: TokenType;

  @IsBoolean()
  readonly twoFactorLogged: boolean;

  @IsBoolean()
  readonly emailLogged: boolean;

  @IsNumber()
  readonly id: number;

  @IsString()
  readonly firstname: string;

  @IsString()
  readonly lastname: string;

  @IsPhoneNumber()
  readonly phoneNumber: string;

  @IsEmail({ allow_utf8_local_part: false })
  readonly email: string;

  @IsBoolean()
  readonly twoFactorVerified: boolean;

  @IsBoolean()
  readonly emailVerified: boolean;

  @IsNumber()
  readonly iat: number;

  @IsNumber()
  readonly exp: number;

  @IsNumber()
  readonly fees: number;
}

export class UpdateUserDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly firstname: string;

  @IsString()
  readonly lastname: string;

  @IsString()
  readonly phoneNumber: string;

  @IsEmail({ allow_utf8_local_part: false })
  readonly email: string;

  @IsDateString()
  @IsValidBirthDate()
  readonly birthDate: string;

  @IsString()
  readonly telegramAccount: string;

  @IsNumber()
  readonly feePercent: number;

  @IsString()
  readonly address: string;
}

export class EmailChangeDto {
  @IsEmail({ allow_utf8_local_part: false })
  @ApiProperty({
    example: 'johndoe@email.com',
    description: 'The new email for the user',
  })
  readonly email: string;
}
