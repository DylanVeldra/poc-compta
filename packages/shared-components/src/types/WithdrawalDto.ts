import { User } from "@shared-types";

export type WithdrawalStatus =
  | "DRAFT"
  | "VALIDATED"
  | "CANCELLED"
  | "PENDING"
  | "REFUSED";

export interface WithdrawalDto {
  publicId: string;
  netRequestedAmount: number;
  rawDebitedAmount: number;
  transactionId?: string;
  emitter: User;
  emitterAddress: string;
  status: WithdrawalStatus;
  statusUpdateDate?: string;
  emitDate: string;
  estimatedProcessingDate?: string;
  refuseMotive?: string;
  originalNetworkId: number;
  originalNetworkToken: string;
  originalNetworkProtocolName: string;
  originalNetworkFixedFee: number;
  originalNetworkPercentFee: number;
}
