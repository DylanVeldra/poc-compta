import { Injectable } from '@nestjs/common';
import { TRANSACTION_MODE } from '@prisma/client';
import Axios, { AxiosInstance } from 'axios';
import {
  IBank,
  IBankAccount,
  ICustomer,
  ITransaction,
} from 'src/types/BankData.type';
import {
  SaltEdgeAccount,
  SaltEdgeConnection,
  SaltEdgeCustomer,
  SaltEdgeResponse,
  SaltEdgeTransaction,
  SALT_EDGE_TRANSACTION_MODE,
} from 'src/types/SaltEdge.type';

@Injectable()
export class SaltEdgeService {
  private axios: AxiosInstance;

  constructor() {
    /**
     * @TODO implemant saltedge's pagination automatically
     */
    this.axios = Axios.create({
      baseURL: 'https://www.saltedge.com/api/v5',
      headers: {
        'App-id': process.env['SALT_EDGE_APP_ID'],
        Secret: process.env['SALT_EDGE_SECRET'],
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  async createCustomer(identifier: string): Promise<ICustomer> {
    const response = await this.axios.post<SaltEdgeResponse<SaltEdgeCustomer>>(
      '/customers',
      {
        data: {
          identifier,
        },
      },
    );
    return this.transformCustomer(response.data.data);
  }

  /**
   * A customer is a customer is a company.
   * Its can have multiple connection which are banks.
   */
  async getCustomers(): Promise<ICustomer[]> {
    const response =
      await this.axios.get<SaltEdgeResponse<SaltEdgeCustomer[]>>('/customers');

    return response.data.data.map(this.transformCustomer);
  }

  /**
   * @TODO use Zod to type check and safe it
   */
  private transformCustomer(inputCustomer: SaltEdgeCustomer): ICustomer {
    return {
      externalId: inputCustomer.id,
      identifier: inputCustomer.identifier,
      secret: inputCustomer.secret,
      externalCreatedAt: new Date(inputCustomer.created_at),
      externalUpdatedAt: new Date(inputCustomer.updated_at),
    };
  }

  /**
   * A connection is equivalent to a bank.
   * Its can have multiple accounts, for exemple different currencies account or same currencies account but for different purpose at the discretion of the company
   */
  async getConnections(customer_id: string): Promise<IBank[]> {
    const response = await this.axios.get<
      SaltEdgeResponse<SaltEdgeConnection[]>
    >('/connections', {
      params: {
        customer_id,
      },
    });

    return response.data.data.map(this.transformBank);
  }

  /**
   * @TODO use Zod to type check and safe it
   */
  private transformBank(inputConnection: SaltEdgeConnection): IBank {
    return {
      externalId: inputConnection.id,
      providerId: inputConnection.provider_id,
      providerCode: inputConnection.provider_code,
      providerName: inputConnection.provider_name,
    };
  }

  /**
   * @TODO IBankAccount
   */
  async getAccounts(connection_id: string): Promise<IBankAccount[]> {
    const response = await this.axios.get<SaltEdgeResponse<SaltEdgeAccount[]>>(
      '/accounts',
      {
        params: {
          connection_id,
        },
      },
    );

    return response.data.data.map(this.transformBankAccount);
  }

  /**
   * @TODO use Zod to type check and safe it
   */
  private transformBankAccount(
    inputBankAccount: SaltEdgeAccount,
  ): IBankAccount {
    return {
      externalId: inputBankAccount.id,
      name: inputBankAccount.name,
      nature: inputBankAccount.nature,
      balance: inputBankAccount.balance,
      currency: inputBankAccount.currency_code,
    };
  }

  async getTransactions(
    connection_id: string,
    option?: { account_id?: string; from_id?: string },
  ): Promise<ITransaction[]> {
    const response = await this.axios.get<
      SaltEdgeResponse<[SaltEdgeTransaction]>
    >('/transactions', {
      params: {
        connection_id,
        ...(option ?? {}),
      },
    });

    /**
     * @TODO filter and remove pending and duplicated txs
     */
    return response.data.data.map(this.transformTransaction);
  }

  /**
   * @TODO use Zod to type check and safe it
   */
  private transformTransaction(
    inputTransaction: SaltEdgeTransaction,
  ): ITransaction {
    return {
      externalId: inputTransaction.id,
      externalCreatedAt: new Date(inputTransaction.created_at),
      amount: inputTransaction.amount,
      currency: inputTransaction.currency_code,
      madeOn: new Date(inputTransaction.made_on),
      description: inputTransaction.description,
      isCrypto: false,
      mode: this.transformTransactionMode(inputTransaction.mode),
    };
  }

  private transformTransactionMode(
    mode: SALT_EDGE_TRANSACTION_MODE,
  ): TRANSACTION_MODE {
    switch (mode) {
      case SALT_EDGE_TRANSACTION_MODE.NORMAL:
        return TRANSACTION_MODE.NORMAL;
      case SALT_EDGE_TRANSACTION_MODE.FEE:
        return TRANSACTION_MODE.FEE;
      case SALT_EDGE_TRANSACTION_MODE.TRANSFER:
        return TRANSACTION_MODE.TRANSFER;
    }
  }
}
