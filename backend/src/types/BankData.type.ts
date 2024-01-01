import { TRANSACTION_MODE } from '@prisma/client';

export type ITransaction = {
  externalId: string;
  externalCreatedAt: Date;
  amount: number;
  currency: string;
  madeOn: Date;
  description: string;
  isCrypto: boolean;
  mode: TRANSACTION_MODE;
};

export type IBankAccount = {
  externalId: string;
  name: string;
  nature: string;
  balance: number;
  currency: string;
};

export type IBank = {
  externalId: string;
  providerId: string;
  providerCode: string;
  providerName: string;
};
