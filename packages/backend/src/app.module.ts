import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CompanyController } from './controllers/company.controller';
import { ExpenseController } from './controllers/expense.controller';
import { InvoiceController } from './controllers/invoice.controller';
import { TransactionController } from './controllers/transaction.controller';
import { SynchCron } from './cron/synch.cron';
import { PrismaModule } from './prisma/prisma.module';
import { CompanyService } from './services/company.service';
import { InvoiceService } from './services/invoice.service';
import { SaltEdgeService } from './services/saltEdge.service';
import { SyncTransactionService } from './services/syncTransaction.service';

@Module({
  imports: [PrismaModule, ScheduleModule.forRoot()],
  controllers: [
    ExpenseController,
    InvoiceController,
    TransactionController,
    CompanyController,
  ],
  providers: [
    InvoiceService,
    SynchCron,
    SyncTransactionService,
    SaltEdgeService,
    CompanyService,
  ],
})
export class AppModule {}
