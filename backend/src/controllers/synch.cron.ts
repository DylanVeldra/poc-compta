import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '@prisma/prisma.service';
import { SyncTransactionService } from 'src/services/syncTransaction.service';

@Injectable()
export class SynchCron {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly syncTransactionService: SyncTransactionService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async syncBanks() {
    const companies = await this.prismaService.company.findMany({
      select: {
        id: true,
        externalBankDataProviderId: true,
      },
    });
    await Promise.all(
      companies.map((company) => this.syncTransactionService.syncBank(company)),
    );
  }

  @Cron(CronExpression.EVERY_DAY_AT_5AM)
  async syncBankAccounts() {
    const banks = await this.prismaService.bank.findMany({
      select: {
        id: true,
        externalId: true,
        companyId: true,
      },
    });
    await Promise.all(
      banks.map((bank) => this.syncTransactionService.syncBankAccount(bank)),
    );
  }

  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async syncTransactionsMorning() {
    const banKAccounts = await this.prismaService.bankAccount.findMany({
      select: {
        id: true,
        externalId: true,
        companyId: true,
        bankId: true,
        bank: {
          select: {
            externalId: true,
          },
        },
      },
    });
    await Promise.all(
      banKAccounts.map((account) =>
        this.syncTransactionService.syncBankAccountTransactions(
          account.companyId,
          { id: account.bankId, externalId: account.bank.externalId },
          { id: account.id, externalId: account.externalId },
        ),
      ),
    );
  }

  @Cron(CronExpression.EVERY_DAY_AT_2PM)
  async syncTransactionsNoon() {
    await this.syncTransactionsMorning();
  }
}
