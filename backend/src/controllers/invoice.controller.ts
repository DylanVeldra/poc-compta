import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Pagination, PaginationDto } from '@utils/pipes/pagination';
import { CreateInvoiceDTO, GetInvoicesQueryDto } from 'src/dto/invoice.dto';
import { InvoiceService } from 'src/services/invoice.service';
// import { AppService } from './app.service';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

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
  async getInvoiceId(@Param() invoiceId: string) {
    return this.invoiceService.getInvoiceById(Number(invoiceId));
  }

  // @TODO add InvoiceRow

  // @TODO delete InvoiceRow
}
