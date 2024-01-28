import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from '@utils/types';
import { CreateCustomerDTO } from 'src/dto/customer.dto';
import { CustomerService } from 'src/services/customer.service';

@Controller('customers')
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

  /**
   * @TODO implem pagination
   */
  @Get('')
  async getCustomers() {}
}
