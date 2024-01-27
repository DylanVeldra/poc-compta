import { HttpStatus } from '@nestjs/common';
import { I18NException } from '@utils/exception';

export const extractTokenFromBearer = (bearer?: string): string => {
  if (!bearer) {
    throw new I18NException(
      'MISSING_BEARER',
      HttpStatus.UNAUTHORIZED,
      'Missing Bearer Token in the request',
    );
  }

  const splitBearer = bearer.split(' ');

  if (splitBearer.length !== 2) {
    throw new I18NException(
      'BAD_FORMAT_BEARER',
      HttpStatus.UNAUTHORIZED,
      'Bad format Bearer Token',
    );
  }
  return splitBearer[1];
};
