import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function ApiPagination() {
  return applyDecorators(
    ApiQuery({
      name: 'limit',
      type: Number,
      description: 'Amount of items per page, min 1 item, max 50 items',
    }),
    ApiQuery({
      name: 'page',
      type: Number,
      description: 'The page number, begin at 1',
    }),
  );
}
