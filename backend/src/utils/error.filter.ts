import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { I18NException } from './exception';
import { I18NResponse } from './response.dto';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: any) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    // Handle prisma exceptions
    if (exception instanceof PrismaClientKnownRequestError) {
      const e = exception as PrismaClientKnownRequestError;
      if (e.code === 'P2002') {
        this.httpAdapterHost.reply(
          ctx.getResponse(),
          new I18NException(
            'DUPLICATE_FIELDS',
            HttpStatus.BAD_REQUEST,
            `Field(s): ${(e?.meta as any)?.target.join(',')} already exists`,
          ).getResponse(),
          HttpStatus.BAD_REQUEST,
        );
        return;
      } else if (e.code === 'P2003') {
        this.httpAdapterHost.reply(
          ctx.getResponse(),
          new I18NException(
            'INVALID_RELATED_FIELDS',
            HttpStatus.BAD_REQUEST,
            `Specified fields values doesn't exists`,
          ).getResponse(),
          HttpStatus.BAD_REQUEST,
        );
        return;
      } else if (e.code === 'P2025') {
        this.httpAdapterHost.reply(
          ctx.getResponse(),
          new I18NException(
            'NOT_FOUND_ERROR',
            HttpStatus.NOT_FOUND,
            'Specified resource could not be found',
          ).getResponse(),
          HttpStatus.NOT_FOUND,
        );
        return;
      } else {
        console.error(exception);
        this.httpAdapterHost.reply(
          ctx.getResponse(),
          new I18NException(
            'UNKNOWN_ERROR',
            HttpStatus.INTERNAL_SERVER_ERROR,
            'Your request could not be processed',
          ).getResponse(),
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
        return;
      }
    } else if (exception instanceof PrismaClientValidationError) {
      console.error(exception);
      this.httpAdapterHost.reply(
        ctx.getResponse(),
        new I18NException(
          'UNKNOWN_ERROR',
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Your request could not be processed',
        ).getResponse(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      return;
    } else if (exception?.name === 'NotFoundError') {
      this.httpAdapterHost.reply(
        ctx.getResponse(),
        new I18NException(
          'NOT_FOUND_ERROR',
          HttpStatus.NOT_FOUND,
          'Specified resource could not be found',
        ).getResponse(),
        HttpStatus.NOT_FOUND,
      );
      return;
    }

    const response = exception.response;

    if (
      !(exception instanceof I18NResponse) &&
      !(response instanceof I18NResponse)
    ) {
      const customResponse = new I18NResponse<string>(
        'UNKNOWN_ERROR',
        exception?.message || response?.message || 'Unknown error',
        response?.statusCode || 500,
      );

      this.httpAdapterHost.reply(
        ctx.getResponse(),
        customResponse,
        customResponse.statusCode,
      );
    } else if (response instanceof I18NResponse) {
      this.httpAdapterHost.reply(
        ctx.getResponse(),
        response,
        response.statusCode,
      );
    } else {
      this.httpAdapterHost.reply(
        ctx.getResponse(),
        exception,
        exception.statusCode,
      );
    }
  }
}
