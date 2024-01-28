import {
  createParamDecorator,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { I18NResponse } from '@utils/response.dto';
import {
  IsNumber,
  Max,
  Min,
  ValidateIf,
  validateOrReject,
} from 'class-validator';
import { Request } from 'express';

export class PaginationIgnoreDto {
  @ValidateIf(() => false)
  @IsNumber()
  private readonly limit: number;

  @ValidateIf(() => false)
  @IsNumber()
  private readonly page: number;
}

export class PaginationDto {
  constructor(
    limit: string,
    page: string,
    private url: URL,
  ) {
    this.limit = parseInt(limit);
    this.page = parseInt(page);
    this.url = url;
  }

  @IsNumber()
  @Min(1)
  @Max(50)
  private readonly limit: number;

  @IsNumber()
  @Min(1)
  private readonly page: number;

  get prisma() {
    return {
      take: this.limit,
      skip: (this.page - 1) * this.limit,
    };
  }

  get next() {
    const nextUrl = new URL(this.url.href);
    nextUrl.searchParams.set('page', (this.page + 1).toString());
    return nextUrl.href.replace(nextUrl.origin, '');
  }

  get previous() {
    if (this.page === 1) {
      return null;
    }
    const previousUrl = new URL(this.url.href);
    previousUrl.searchParams.set('page', (this.page - 1).toString());
    return previousUrl.href.replace(previousUrl.origin, '');
  }

  response<T>(data: T[], count: number) {
    const nbPages = Math.ceil(count / this.prisma.take);
    return {
      data,
      ...(this.page !== 1 ? { previous: this.previous } : {}),
      ...(this.page < nbPages ? { next: this.next } : {}),
      nbPages,
    };
  }
}

export const Pagination = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request;
    const queryParams = request.query as any;
    const res = new PaginationDto(
      queryParams.limit,
      queryParams.page,
      new URL(request.url, `http://${request.headers.host}`),
    );
    try {
      await validateOrReject(res);
    } catch (e) {
      const errorsString = e
        .map((error) =>
          Object.keys(error.constraints)
            .map((key) => error.constraints[key])
            .join(', '),
        )
        .join(', ');
      throw new I18NResponse<string>(
        'VALIDATION_ERROR',
        errorsString,
        HttpStatus.BAD_REQUEST,
      );
    }
    return res;
  },
);
