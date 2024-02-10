export interface DepositInformationsData {
  emptyFields?: () => boolean;
  idAddress: number;
  rawDepositedAmount: number;
  transactionId: string;
  additionalInformations: string;
}
