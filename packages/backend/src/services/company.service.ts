// import { UserPayloadDto } from '@auth/dto/auth.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateCompanyDTO } from 'src/dto/company.dto';
import { SaltEdgeService } from './saltEdge.service';
import { User } from '@prisma/client';
// import { PaginationDto } from '@utils/pipes/pagination';
// import { EmailService } from '@email/email.service';

@Injectable()
export class CompanyService {
  constructor(
    private prismaService: PrismaService,
    private saltEdgeService: SaltEdgeService,
  ) {}

  async createCompany(input: CreateCompanyDTO, userId: number) {
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

    await this.prismaService.usersOnCompanies.create({
      data: {
        userId,
        companyId: createdCompany.id,
      },
    });

    const user = (await this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        defaultCompany: true,
      },
    })) as User;

    if (user.defaultCompany === 0) {
      await this.prismaService.user.update({
        where: { id: userId },
        data: {
          defaultCompany: createdCompany.id,
        },
      });
    }

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
