import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateCompanyDTO } from 'src/dto/company.dto';
import { CompanyService } from 'src/services/company.service';

@Controller('companies')
export class CompanyController {
  constructor(
    private prismaSerivce: PrismaService,
    private companyService: CompanyService,
  ) {}

  @Post('')
  async createCompany(
    @Body() companyToCreate: CreateCompanyDTO,
  ): Promise<{ companyId: number }> {
    return this.companyService.createCompany(companyToCreate);
  }

  /**
   * implem pagination
   */
  @Get('')
  async getCompanies() {
    return this.prismaSerivce.company.findMany();
  }
}
