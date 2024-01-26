import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { INVOICE_STATUS } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { I18NException } from '@utils/exception';
import { Pagination, PaginationDto } from '@utils/pipes/pagination';
import { put } from '@vercel/blob';
import { CreateInvoiceDTO, GetInvoicesQueryDto } from 'src/dto/invoice.dto';
import { generateInvoice } from 'src/services/invoice-pdf.service';
import { InvoiceService } from 'src/services/invoice.service';
// import { AppService } from './app.service';

@Controller('invoices')
export class InvoiceController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly invoiceService: InvoiceService,
  ) {}

  @Post()
  async createDraftInvoice(@Body() invoiceToCreate: CreateInvoiceDTO) {
    return this.invoiceService.createInvoice(42, invoiceToCreate);
  }

  @Get()
  async getInvoices(
    @Pagination() pagination: PaginationDto,
    @Query() params: GetInvoicesQueryDto,
  ) {
    return this.invoiceService.getAllInvoices(pagination, params);
  }

  @Get(':id')
  async getInvoiceById(@Param('id', ParseIntPipe) id: number) {
    return this.invoiceService.getInvoiceById(id);
  }

  @Post(':invoiceId/transaction/:transactionId')
  async linkTransaction(
    @Param('invoiceId', ParseIntPipe) invoiceId: number,
    @Param('transactionId', ParseIntPipe) transactionId: number,
  ) {
    const transaction = await this.prismaService.transaction.findUnique({
      where: {
        id: transactionId,
        companyId: 1,
      },
      select: {
        id: true,
      },
    });

    if (!transaction) {
      throw new I18NException(
        'TRANSACTION_NOT_FOUND',
        404,
        `transaction ${transactionId} not found`,
      );
    }

    const invoice = await this.prismaService.invoice.findUnique({
      where: {
        id: invoiceId,
        companyId: 1,
      },
      select: {
        id: true,
      },
    });

    if (!invoice) {
      throw new I18NException(
        'INVOICE_NOT_FOUND',
        404,
        `invoice ${invoiceId} not found`,
      );
    }

    this.prismaService.invoicesOnTransactions.create({
      data: {
        invoiceId,
        transactionId,
        assignedBy: 1,
      },
    });
  }

  @Patch(':id/validate')
  async getInvoiceId(@Param() id: number) {
    const invoice = await this.prismaService.invoice.findUnique({
      where: {
        id,
        companyId: 1,
      },
      select: {
        id: true,
        status: true,
      },
    });

    if (!invoice) {
      throw new I18NException(
        'INVOICE_NOT_FOUND',
        404,
        `invoice ${id} not found`,
      );
    }

    this.prismaService.$transaction(async (tx) => {
      const invoice = await tx.invoice.findFirst({
        where: {
          NOT: {
            status: INVOICE_STATUS.DRAFT,
          },
          // @TODO doit être dans l'année en cours
          companyId: 1,
        },
        orderBy: [
          {
            validatedAt: 'desc',
          },
        ],
        select: {
          id: true,
          comptabilityId: true,
        },
      });
      const newComptabilityId = invoice?.comptabilityId ?? 0 + 1;
      await tx.invoice.update({
        where: {
          id,
          companyId: 1,
        },
        data: {
          status: INVOICE_STATUS.UNPAID,
          comptabilityId: newComptabilityId,
          validatedAt: new Date(),
        },
      });
    });
  }

  @Get('test/toto')
  async test() {
    const pdf = await generateInvoice();

    /**
     * @TODO move this to an upload service
     */
    const response = await put('invoice.pdf', pdf, {
      access: 'public',
      token: process.env.EXPENSE_DOCUMENT_BLOB_READ_WRITE_TOKEN,
    });

    console.log(response);
  }
}
