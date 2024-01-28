import * as Yup from "yup"
import { useLanguageDictionary } from "@shared-hooks"
import { WithdrawalInformationsData, AddressDto } from "@shared-types"

export const withdrawalRequestValidation = (
  withdrawal: WithdrawalInformationsData,
  address: AddressDto,
  balance: number
) => {
  const dict = useLanguageDictionary()
  return {
    schema: Yup.object().shape({
      emitterAddress: Yup.string().required(
        dict.withdrawal.validation.emitterAddressRequired
      ),
      netRequestedAmount: Yup.number().required(
        dict.withdrawal.validation.netRequestedAmountRequired
      ),
      // .min(1000, dict.withdrawal.validation.netRequestedAmountMinAmount)
      // .test(
      //   'is-under-balance',
      //   dict.withdrawal.validation.netRequestedAmountBalance,
      //   (value) => {
      //     if (balance === undefined) {
      //       return true;
      //     }
      //     const netAmount =
      //       100 * (value ?? 0) +
      //       (address?.fixedFee ?? 0) +
      //       100 * (value ?? 0) * ((address?.percentFee ?? 0) / 100);
      //     return netAmount <= balance;
      //   },
      // ),
    }),
    initialValues: {
      emitterAddress: "",
      netRequestedAmount: 0,
    },
  }
}
