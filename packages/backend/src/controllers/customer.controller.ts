import { JwtTwoFactorGuard } from '@auth/2FA/jwt-two-factor.guard';
import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Pagination, PaginationDto } from '@utils/pipes/pagination';
import { I18NResponse } from '@utils/response.dto';
import { RequestContext } from '@utils/types';
import { CreateCustomerDTO } from 'src/dto/customer.dto';
import { CustomerService } from 'src/services/customer.service';

@Controller('customers')
@UseGuards(JwtTwoFactorGuard)
export class CustomerController {
  constructor(
    @Inject(REQUEST) private readonly requestContext: RequestContext,
    private customerService: CustomerService,
  ) {}

  @Post('')
  async createCustomer(
    @Body() customerToCreate: CreateCustomerDTO,
  ): Promise<{ customerId: number }> {
    return this.customerService.createCustomer(
      customerToCreate,
      this.requestContext.context.companyId,
    );
  }

  @Get()
  async getCustomers(@Pagination() pagination: PaginationDto) {
    return new I18NResponse(
      'OK',
      await this.customerService.getAllCustomers(pagination, {
        companyId: this.requestContext.context.companyId,
      }),
    );
  }
}
