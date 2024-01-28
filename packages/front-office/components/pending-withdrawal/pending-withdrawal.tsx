import { GradientBorder } from "@shared-components/gradient-border";
import { Icon } from "@shared-components/icon";
import {
  DateFormats,
  formatAmount,
  formatDate,
  getTokenLogoUrl,
} from "@shared-utils";
import { WithdrawalDto } from "@shared-types";
import { useLanguageDictionary } from "@shared-hooks";
import { Address } from "@shared-components/address";

interface PendingWithdrawalProps {
  withdrawal: WithdrawalDto;
}
export default function PendingWithdrawal(props: PendingWithdrawalProps) {
  const dict = useLanguageDictionary();
  return (
    <div className="my-10 max-w-[900px] mx-auto">
      <GradientBorder>
        <div className="bg-white dark:bg-dark-gray py-3 px-5 rounded-t-[2px] mb-[1px] flex justify-between items-center space-x-2">
          <div className="text-md font-semibold flex flex-row items-center">
            <Icon src="rs-clock" />
            <h3 className="pl-[20px]">
              {dict.withdrawal.currentRequest}{" "}
              {formatDate(props.withdrawal?.emitDate, DateFormats.SHORT)}
            </h3>
          </div>
          <div className="text-md">
            {formatAmount(props.withdrawal.netRequestedAmount / 100)}
          </div>
          <div className="w-56">
            <Address
              operationType="withdrawal"
              network={props.withdrawal.originalNetworkProtocolName}
              token={props.withdrawal.originalNetworkToken}
              logoUrl={getTokenLogoUrl(props.withdrawal.originalNetworkToken)}
              fixedFee={props.withdrawal.originalNetworkFixedFee}
              percentFee={props.withdrawal.originalNetworkPercentFee}
              inline
              padding
              shortAddress
            />
          </div>
          <div className="text-sm flex flex-row space-x-2">
            <span>{dict.withdrawal.date}</span>
            <span>
              {formatDate(
                props.withdrawal.estimatedProcessingDate,
                DateFormats.SHORT
              )}
            </span>
          </div>
        </div>
      </GradientBorder>
    </div>
  );
}
