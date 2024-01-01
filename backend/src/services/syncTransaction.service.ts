import { Injectable } from '@nestjs/common';
import { Bank, BankAccount, Company } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { SaltEdgeService } from './saltEdge.service';

@Injectable()
export class SyncTransactionService {
  constructor(
    private prismaService: PrismaService,
    private bankDataProviderService: SaltEdgeService,
  ) {}

  async syncBank(company: Pick<Company, 'id' | 'externalBankDataProviderId'>) {
    const banks = await this.bankDataProviderService.getConnections(
      company.externalBankDataProviderId,
    );

    await Promise.all(
      banks.map((bank) => {
        return this.prismaService.bank.upsert({
          where: {
            externalId: bank.externalId,
          },
          create: {
            ...bank,
            companyId: company.id,
          },
          update: {
            providerId: bank.providerId,
            providerCode: bank.providerCode,
            providerName: bank.providerName,
          },
        });
      }),
    );
  }

  async syncBankAccount(
    bank: Required<Pick<Bank, 'id' | 'externalId' | 'companyId'>>,
  ) {
    const bankAccounts = await this.bankDataProviderService.getAccounts(
      bank.externalId,
    );
    await Promise.all(
      bankAccounts.map((account) => {
        return this.prismaService.bankAccount.upsert({
          where: {
            externalId: account.externalId,
          },
          create: {
            ...account,
            companyId: bank.companyId,
            bankId: bank.id,
          },
          update: {
            name: account.name,
            nature: account.nature,
            balance: account.balance,
            currency: account.currency,
          },
        });
      }),
    );
  }

  async syncBankAccountTransactions(
    companyId: number,
    bank: Required<Pick<Bank, 'id' | 'externalId'>>,
    bankAccount: Required<Pick<BankAccount, 'id' | 'externalId'>>,
  ) {
    const lastTransaction = await this.prismaService.transactions.findFirst({
      where: { companyId, bankAccountId: bankAccount.id },
      select: { id: true, externalId: true },
      orderBy: {
        externalCreatedAt: 'desc',
      },
    });
    const transactions = await this.bankDataProviderService.getTransactions(
      bank.externalId,
      {
        from_id: lastTransaction?.externalId,
        account_id: bankAccount.externalId,
      },
    );

    this.prismaService.transactions.createMany({
      data: transactions.map((tx) => {
        return {
          ...tx,
          companyId,
          bankId: bank.id,
          bankAccountId: bankAccount.id,
        };
      }),
      skipDuplicates: true,
    });
  }
}
