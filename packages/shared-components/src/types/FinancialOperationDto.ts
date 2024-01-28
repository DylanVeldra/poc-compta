import { User } from '@shared-types';

/**
 * Pas de de majuscule parce que adhérence avec le nom des icones
 */
export type FinancialOperationType = 'deposit' | 'withdrawal' | 'fees';

export type FinancialOperationStatus =
  | 'DRAFT'
  | 'VALIDATED'
  | 'CANCELLED'
  | 'PENDING'
  | 'REFUSED'
  | 'DONE';

export interface FinancialOperationDto {
  operation: FinancialOperationType;
  publicId: string;
  transactionId?: string;
  emitter?: User;
  emitDate?: string;
  status?: FinancialOperationStatus;
  statusUpdateDate?: string;
  rawAmount?: number;
  netAmount: number;
  address?: string;
  token?: string;
  estimatedProcessingDate?: string;
}
