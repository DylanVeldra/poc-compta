import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class I18NResponse<T> {
  @IsNumber()
  @ApiProperty({
    example: 401,
    description: 'The http status code',
  })
  readonly statusCode: number;

  @IsString()
  @ApiProperty({
    example: 'I18N_KEY',
    description: 'The i18n message key',
  })
  readonly i18n: string;

  @ApiProperty({
    example: {
      data: 'yes',
    },
    description: 'The content of the response',
  })
  readonly body: T | null;

  constructor(i18n: string, body: T | null = null, statusCode = 200) {
    this.i18n = i18n;
    this.body = body;
    this.statusCode = statusCode;
  }
}
