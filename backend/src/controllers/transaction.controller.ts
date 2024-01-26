import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { I18NException } from '@utils/exception';

@Controller('transactions')
export class TransactionController {
  constructor(private prismaService: PrismaService) {}

  /**
   *
   */
  @Get(':id')
  async getTransactionById(@Param('id', ParseIntPipe) id: number) {
    const transaction = await this.prismaService.transaction.findUnique({
      where: {
        id,
        companyId: 1,
      },
      include: {
        expenseJustification: {
          include: {
            expenseDocuments: true,
          },
        },
      },
    });
    if (!transaction) {
      throw new I18NException(
        'TRANSACTION_NOT_FOUND',
        404,
        `transaction ${id} not found`,
      );
    }
    return transaction;
  }
}
