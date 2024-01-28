// import { UserPayloadDto } from '@auth/dto/auth.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { INVOICE_STATUS, Prisma } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { I18NException } from '@utils/exception';
import { PaginationDto } from '@utils/pipes/pagination';
import { CreateCompanyDTO } from 'src/dto/company.dto';
import { CreateCustomerDTO } from 'src/dto/customer.dto';
import { SaltEdgeService } from './saltEdge.service';
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
}
