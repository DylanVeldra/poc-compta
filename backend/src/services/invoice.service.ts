// import { UserPayloadDto } from '@auth/dto/auth.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { INVOICE_STATUS, Prisma } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { I18NException } from '@utils/exception';
import { PaginationDto } from '@utils/pipes/pagination';
// import { PaginationDto } from '@utils/pipes/pagination';
import { CreateInvoiceDTO } from 'src/dto/invoice.dto';
// import { EmailService } from '@email/email.service';

@Injectable()
export class InvoiceService {
  constructor(private prismaService: PrismaService) {}

  // private async findAvailablePublicId() {
  //   do {
  //     var code = CodeGenerator.generate(6, Base.ALPHANUM);
  //     var depositObject = await this.prismaService.deposit.findUnique({
  //       where: {
  //         publicId: code,
  //       },
  //     });
  //   } while (depositObject !== null);
  //   return code;
  // }

  async createInvoice(_userId: number, input: CreateInvoiceDTO) {
    // const user = await this.prismaService.user.findFirstOrThrow({
    //   where: {
    //     id: _userId,
    //   },
    // });
    const createdInvoice = await this.prismaService.invoice.create({
      data: {
        status: INVOICE_STATUS.DRAFT,
        description: input.description,
        companyId: 1,
        currency: 'EUR',
        rows: {
          createMany: {
            data: input.rows.map((row) => {
              return {
                description: row.description,
                amount: row.amount,
                pricePerUnit: row.pricePerUnit,
                vat: 0, // todo
              };
            }),
          },
        },
      },
      select: {
        id: true,
        rows: {
          select: {
            id: true,
          },
        },
      },
    });
    // await this.emailService.sendTemplatedEmail(
    //   user.email,
    //   new DepositConfirmTemplate({
    //     mediaUrl: `${process.env.FRONT_OFFICE_BASE_URL}/images/emails`,
    //     antiPhishingCode: user.antiPhishingCode!,
    //     date: moment(),
    //   }),
    // );

    return {
      invoiceId: createdInvoice.id,
      rows: createdInvoice.rows.map((row) => row.id),
    };
  }

  // , _user?: UserPayloadDto
  async getInvoiceById(invoiceId: number) {
    const request = { id: invoiceId };
    // if (user.role !== UserRole.ADMIN) {
    //   request['emitterId'] = user.id;
    // }
    return await this.prismaService.invoice.findFirstOrThrow({
      where: request,
      select: {
        status: true,
        description: true,
        rows: {
          select: {
            description: true,
            amount: true,
            pricePerUnit: true,
          },
        },
      },
    });
  }

  async validateInvoice(id: number) {
    const invoice = await this.prismaService.invoice.findUniqueOrThrow({
      where: {
        id,
      },
    });
    if (invoice.status !== INVOICE_STATUS.DRAFT) {
      throw new I18NException(
        'INVOICE_STATUS_NOT_DRAFT',
        HttpStatus.BAD_REQUEST,
      );
    }

    // @TODO attribution du numéro de facture
    const updatedInvoice = await this.prismaService.invoice.update({
      where: {
        id,
      },
      data: {
        status: INVOICE_STATUS.UNPAID,
        updatedAt: new Date(),
      },
    });

    return updatedInvoice;
  }

  // async getByUser(userId: number) {
  //   return await this.prismaService.invoice.findMany({
  //     where: {
  //       userId: userId,
  //     },
  //     select: {
  //       emitter: {
  //         select: {
  //           firstname: true,
  //           lastname: true,
  //         },
  //       },
  //     },
  //     orderBy: [{ emitDate: 'desc' }],
  //   });
  // }

  // async summaryByStatus(year: number, month: number) {
  //   const startDate = moment()
  //     .year(year)
  //     .month(month - 1)
  //     .startOf('month');
  //   const endDate = moment()
  //     .year(year)
  //     .month(month - 1)
  //     .endOf('month');
  //   const filter: Prisma.DepositAggregateArgs = {
  //     _sum: {
  //       rawDepositedAmount: true,
  //     },
  //     _count: true,
  //   };

  //   const pending = await this.prismaService.deposit.aggregate({
  //     ...filter,
  //     where: {
  //       status: DepositStatus.PENDING,
  //     },
  //   });

  //   const refused = await this.prismaService.deposit.aggregate({
  //     ...filter,
  //     where: {
  //       status: DepositStatus.REFUSED,
  //       statusUpdateDate: {
  //         gte: startDate.toDate(),
  //         lte: endDate.toDate(),
  //       },
  //     },
  //   });

  //   const validated = await this.prismaService.deposit.aggregate({
  //     ...filter,
  //     where: {
  //       status: DepositStatus.VALIDATED,
  //       statusUpdateDate: {
  //         gte: startDate.toDate(),
  //         lte: endDate.toDate(),
  //       },
  //     },
  //   });

  //   return {
  //     PENDING: {
  //       count: pending._count,
  //       sum: pending._sum?.rawDepositedAmount || 0,
  //     },
  //     REFUSED: {
  //       count: refused._count,
  //       sum: refused._sum?.rawDepositedAmount || 0,
  //     },
  //     VALIDATED: {
  //       count: validated._count,
  //       sum: validated._sum?.rawDepositedAmount || 0,
  //     },
  //   };
  // }

  async getAllInvoices(
    pagination: PaginationDto,
    {
      status,
      // _userId,
    }: {
      status?: INVOICE_STATUS;
      userId?: number;
    },
  ) {
    const filters = {
      where: {
        // emitterId: userId ?? {},
        status: status ?? {},
      } as Prisma.InvoiceWhereInput,
      orderBy: [
        { createdAt: 'desc' },
      ] as Prisma.Enumerable<Prisma.InvoiceOrderByWithRelationInput>,
    };
    const count = await this.prismaService.invoice.count(filters);
    const data = await this.prismaService.invoice.findMany({
      ...pagination.prisma,
      select: {
        status: true,
        description: true,
        rows: {
          select: {
            description: true,
            amount: true,
            pricePerUnit: true,
          },
        },
      },
      ...filters,
    });
    return pagination.response(data, count);
  }
}
