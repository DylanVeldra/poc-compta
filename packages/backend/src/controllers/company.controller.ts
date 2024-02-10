import { JwtTwoFactorGuard } from '@auth/2FA/jwt-two-factor.guard';
import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PrismaService } from '@prisma/prisma.service';
import { RequestContext } from '@utils/types';
import { CreateCompanyDTO } from 'src/dto/company.dto';
import { CompanyService } from 'src/services/company.service';

@Controller('companies')
@UseGuards(JwtTwoFactorGuard)
export class CompanyController {
  constructor(
    @Inject(REQUEST) private readonly requestContext: RequestContext,
    private readonly prismaSerivce: PrismaService,
    private readonly companyService: CompanyService,
  ) {}

  @Post('')
  async createCompany(
    @Body() companyToCreate: CreateCompanyDTO,
  ): Promise<{ companyId: number }> {
    return this.companyService.createCompany(
      companyToCreate,
      this.requestContext.context.user.id,
    );
  }

  /**
   * @TODO implem pagination
   */
  @Get('')
  async getCompanies() {
    return this.prismaSerivce.company.findMany();
  }
}
