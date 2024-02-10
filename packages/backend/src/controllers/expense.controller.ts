import { JwtTwoFactorGuard } from '@auth/2FA/jwt-two-factor.guard';
import {
  Body,
  Controller,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PrismaService } from '@prisma/prisma.service';
import { I18NException } from '@utils/exception';
import { put } from '@vercel/blob';
import { UpsertExpenseDTO } from 'src/dto/expense.dto';

@Controller('expenses')
@UseGuards(JwtTwoFactorGuard)
export class ExpenseController {
  constructor(private prismaService: PrismaService) {}

  @Put(':id')
  async describeExpenseJustification(
    @Param('id', ParseIntPipe) id: number,
    @Body() inputExpenseJustification: UpsertExpenseDTO,
  ) {
    const transaction = await this.prismaService.transaction.findUnique({
      where: {
        id,
        companyId: 1,
      },
      select: {
        id: true,
        amount: true,
      },
    });

    if (!transaction) {
      throw new I18NException(
        'TRANSACTION_NOT_FOUND',
        404,
        `transaction ${id} not found`,
      );
    }

    if (transaction.amount > 0) {
      throw new I18NException(
        'TRANSACTION_IS_NOT_AN_EXPENSE',
        400,
        `transaction ${id} is not an expense`,
      );
    }

    await this.prismaService.expenseJustification.upsert({
      where: {
        id,
      },
      create: {
        description: inputExpenseJustification.description,
        deductibleVAT: 0,
        transaction: {
          connect: { id },
        },
      },
      update: {
        description: inputExpenseJustification.description,
      },
    });
  }

  /**
   * @TODO move to a service if needed
   */
  @Post('upload/:expenseJutificationId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadJustificationDocument(
    @Param('expenseJutificationId') expenseJustificationId,
    @UploadedFile()
    file: Express.Multer.File,
  ): Promise<void> {
    const expenseJustification =
      await this.prismaService.expenseJustification.findUnique({
        where: { id: expenseJustificationId },
      });

    if (!expenseJustification) {
      throw new I18NException(
        'EXPENSE_JUSTIFICATION_NOT_FOUND',
        HttpStatus.NOT_FOUND,
        `Expense justification ${expenseJustificationId} not found`,
      );
    }

    /**
     * @TODO move this to an upload service
     */
    const response = await put(file.originalname, file.buffer, {
      access: 'public',
      token: process.env.EXPENSE_DOCUMENT_BLOB_READ_WRITE_TOKEN,
    });

    await this.prismaService.expenseDocument.create({
      data: {
        name: file.originalname,
        contentType: response.contentType,
        url: response.url,
        expenseJustificationId: expenseJustification.id,
      },
    });
  }
}
