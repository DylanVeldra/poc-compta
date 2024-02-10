// import { UserPayloadDto } from '@auth/dto/auth.dto';
import { Injectable } from '@nestjs/common';
import { INVOICE_STATUS, Prisma } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { PaginationDto } from '@utils/pipes/pagination';
// import { PaginationDto } from '@utils/pipes/pagination';
// import { EmailService } from '@email/email.service';

@Injectable()
export class IncomeService {
  constructor(private prismaService: PrismaService) {}

  async getAllIncomes(
    pagination: PaginationDto,
    {
      status,
      companyId,
    }: {
      status?: INVOICE_STATUS;
      companyId: number;
    },
  ) {
    const filters = {
      where: {
        companyId,
        status: status ?? {},
      } as Prisma.InvoiceWhereInput,
      orderBy: [
        { createdAt: 'desc' },
      ] as Prisma.Enumerable<Prisma.InvoiceOrderByWithRelationInput>,
    };
    const count = await this.prismaService.invoice.count(filters);

    // Todo replace it by income table
    const data = await this.prismaService.invoice.findMany({
      ...pagination.prisma,
      select: {
        id: true,
        updatedAt: true,
        status: true,
        rows: {
          select: {
            quantity: true,
            pricePerUnit: true,
            type: true,
          },
        },
        customer: true,
      },
      ...filters,
    });

    const formatedData = data.map((income) => {
      const amount = income.rows.reduce((acc, cur) => {
        return (
          acc +
          (cur.quantity * cur.pricePerUnit +
            (cur.quantity * cur.pricePerUnit * 20) / 100)
        );
      }, 0);

      return {
        type: 'INVOICE',
        customer: income.customer,
        date: income.updatedAt,
        id: income.id,
        amount,
        status: income.status,
      };
    });
    return pagination.response(formatedData, count);
  }
}
