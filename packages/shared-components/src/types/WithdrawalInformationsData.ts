export interface WithdrawalInformationsData {
  emptyFields?: () => boolean;
  addressId?: number;
  emitterAddress?: string;
  netRequestedAmount?: number;
  emailCode?: string;
  twoFactorToken?: string;
}
