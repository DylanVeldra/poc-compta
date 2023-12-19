import { HttpException } from '@nestjs/common';
import { I18NResponse } from './response.dto';

export class I18NException extends HttpException {
  constructor(
    i18n: string,
    statusCode: number = 500,
    message: string = 'Unknown error',
  ) {
    super(new I18NResponse<string>(i18n, message, statusCode), statusCode);
  }
}
