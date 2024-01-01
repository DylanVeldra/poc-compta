import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { InvoiceController } from './controllers/invoice.controller';
import { PrismaModule } from './prisma/prisma.module';
import { InvoiceService } from './services/invoice.service';

@Module({
  imports: [PrismaModule, ScheduleModule.forRoot()],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class AppModule {}
