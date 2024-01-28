import { User } from "@shared-types";

export type DepositStatus = "VALIDATED" | "CANCELLED" | "PENDING" | "REFUSED";

export interface DepositDto {
  publicId: string;
  rawDepositedAmount: number;
  netCreditedAmount: number;
  transactionId: string;
  emitter: User;
  emitDate: string;
  status: DepositStatus;
  statusUpdateDate?: string;
  originalAddressId: number;
  originalAddress: string;
  originalAddressName: string;
  originalAddressProtocolName: string;
  originalAddressToken: string;
  originalAddressFixedFee: number;
  originalAddressPercentFee: number;
  additionalInformations?: string;
  type?: "deposit" | "withdrawal" | "fees";
  refuseMotive?: string;
}
