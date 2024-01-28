import {
  DepositDto,
  FeesDto,
  FinancialOperationDto,
  User,
  WithdrawalDto,
} from "@shared-types"

export const depositToFinancialOperation = (
  deposit: DepositDto
): FinancialOperationDto => {
  return {
    operation: "deposit",
    publicId: deposit.publicId,
    transactionId: deposit.transactionId,
    emitter: deposit.emitter,
    emitDate: deposit.emitDate,
    status: deposit.status,
    statusUpdateDate: deposit.statusUpdateDate,
    rawAmount: deposit.rawDepositedAmount,
    netAmount: deposit.netCreditedAmount,
    address: deposit.originalAddress,
    token: deposit.originalAddressToken,
  }
}

export const feesToFinancialOperation = (
  fees: FeesDto
): FinancialOperationDto => {
  return {
    ...fees,
    operation: "fees",
    netAmount: fees.amount,
    statusUpdateDate: fees.date,
    emitDate: fees.createdAt,
  }
}

export const withdrawalToFinancialOperation = (
  withdrawal: WithdrawalDto
): FinancialOperationDto => {
  return {
    operation: "withdrawal",
    publicId: withdrawal.publicId,
    transactionId: withdrawal.transactionId,
    emitter: withdrawal.emitter,
    emitDate: withdrawal.emitDate,
    status: withdrawal.status,
    statusUpdateDate: withdrawal.statusUpdateDate,
    rawAmount: withdrawal.rawDebitedAmount,
    netAmount: withdrawal.netRequestedAmount,
    address: withdrawal.emitterAddress,
    token: withdrawal.originalNetworkToken,
    estimatedProcessingDate: withdrawal.estimatedProcessingDate,
  }
}
