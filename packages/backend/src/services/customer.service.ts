// import { UserPayloadDto } from '@auth/dto/auth.dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { I18NException } from '@utils/exception';
import { PaginationDto } from '@utils/pipes/pagination';
import { CreateCustomerDTO } from 'src/dto/customer.dto';
// import { PaginationDto } from '@utils/pipes/pagination';
// import { EmailService } from '@email/email.service';

@Injectable()
export class CustomerService {
  constructor(private prismaService: PrismaService) {}

  async createCustomer(input: CreateCustomerDTO, companyId: number) {
    const createdCustomer = await this.prismaService.customer.create({
      data: {
        name: input.name,
        street: input.street,
        postalCode: input.postalCode,
        city: input.city,
        country: input.country,
        isCompany: input.isCompany,
        vatId: input.vatId,
        registryId: input.registryId,
        companyId,
      },
      select: {
        id: true,
      },
    });

    return {
      customerId: createdCustomer.id,
    };
  }

  async getAllCustomers(
    pagination: PaginationDto,
    {
      companyId,
    }: {
      companyId: number;
    },
  ) {
    if (!companyId) {
      throw new I18NException('COMPANY_ID_MISSING', 400);
    }
    const filters = {
      where: {
        companyId,
      } as Prisma.CustomerWhereInput,
      orderBy: [
        { createdAt: 'desc' },
      ] as Prisma.Enumerable<Prisma.CustomerOrderByWithRelationInput>,
    };
    const count = await this.prismaService.customer.count(filters);
    const data = await this.prismaService.customer.findMany({
      ...pagination.prisma,
      ...filters,
    });
    return pagination.response(data, count);
  }
}
