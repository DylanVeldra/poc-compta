import { ValidationPipe, HttpStatus } from '@nestjs/common';
import {
  CorsOptions,
  CorsOptionsDelegate,
} from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './utils/error.filter';
import { I18NResponse } from './utils/response.dto';

function getCors():
  | boolean
  | CorsOptions
  | CorsOptionsDelegate<any>
  | undefined {
  if (process.env.APP_ENV !== 'production') {
    return true;
  }
  return {
    origin: /^(https:\/\/([^\.]*\.)?eovo\.capital)$/i,
  };
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: getCors(),
  });

  // OpenAPI
  const config = new DocumentBuilder()
    .setTitle('EOVO')
    .setDescription('OpenAPI documentation')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  if (process.env.APP_ENV !== 'production') {
    SwaggerModule.setup('openapi', app, document);
  }

  // For class-transormer
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      always: true,
      forbidUnknownValues: true,
      exceptionFactory: (errors) => {
        const errorsString = errors
          .map((error) =>
            Object.keys(error.constraints!)
              .map((key) => error.constraints![key])
              .join(', '),
          )
          .join(', ');
        return new I18NResponse<string>(
          'VALIDATION_ERROR',
          errorsString,
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );

  // https://github.com/nestjs/nest/issues/528#issuecomment-382330137
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter as any));

  await app.listen(3000);
}
bootstrap();
