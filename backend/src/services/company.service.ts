// import { UserPayloadDto } from '@auth/dto/auth.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { INVOICE_STATUS, Prisma } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { I18NException } from '@utils/exception';
import { PaginationDto } from '@utils/pipes/pagination';
import { CreateCompanyDTO } from 'src/dto/company.dto';
import { SaltEdgeService } from './saltEdge.service';
// import { PaginationDto } from '@utils/pipes/pagination';
// import { EmailService } from '@email/email.service';

@Injectable()
export class CompanyService {
  constructor(
    private prismaService: PrismaService,
    private saltEdgeService: SaltEdgeService,
  ) {}

  async createCompany(input: CreateCompanyDTO) {
    // const user = await this.prismaService.user.findFirstOrThrow({
    //   where: {
    //     id: _userId,
    //   },
    // });

    const createdCompany = await this.prismaService.company.create({
      data: {
        name: input.name,
        type: input.type,
        registryId: input.registryId,
        vatId: input.vatId,
      },
      select: {
        id: true,
      },
    });

    const customer = await this.saltEdgeService.createCustomer(
      `${createdCompany.id}`,
    );

    const updated = await this.prismaService.company.update({
      where: {
        id: createdCompany.id,
      },
      data: {
        externalBankDataProviderId: customer.externalId,
      },
      select: {
        id: true,
      },
    });

    return {
      companyId: updated.id,
    };
  }
}
