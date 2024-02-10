import { JwtTwoFactorGuard } from '@auth/2FA/jwt-two-factor.guard';
import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Pagination, PaginationDto } from '@utils/pipes/pagination';
import { RequestContext } from '@utils/types';
import { GetIncomesQueryDto } from 'src/dto/income.dto';
import { IncomeService } from 'src/services/income.service';
// import { AppService } from './app.service';

@Controller('incomes')
@UseGuards(JwtTwoFactorGuard)
export class InvoiceController {
  constructor(
    @Inject(REQUEST) private readonly requestContext: RequestContext,
    private readonly incomeService: IncomeService,
  ) {}

  @Get()
  async getIncomes(
    @Pagination() pagination: PaginationDto,
    @Query() params: GetIncomesQueryDto,
  ) {
    return this.incomeService.getAllIncomes(pagination, {
      ...params,
      companyId: this.requestContext.context.companyId,
    });
  }
}
