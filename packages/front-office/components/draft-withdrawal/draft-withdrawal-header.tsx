import { Address } from "@shared-components/address";
import { Icon } from "@shared-components/icon";
import { Tooltip } from "@shared-components/tooltip";
import { useLanguageDictionary } from "@shared-hooks";
import { WithdrawalDto } from "@shared-types";
import { DateFormats, formatDate, getTokenLogoUrl } from "@shared-utils";

interface DraftWithdrawalHeaderProps {
  withdrawal: WithdrawalDto;
  isOpen: boolean;
}

export default function DraftWithdrawalHeader(
  props: DraftWithdrawalHeaderProps
) {
  const dict = useLanguageDictionary();
  return (
    <>
      <div className="hidden md:flex flex-row justify-between items-center h-5">
        <div className="flex text-md font-semibold flex-row items-center">
          <Icon src="rs-pencil" />
          <h3 className="pl-[20px]">{dict.withdrawal.draft}</h3>
        </div>
        {!props.isOpen ? (
          <div className="flex flew-row items-center text-md space-x-2 ml-4">
            <div>
              <span>{props.withdrawal.netRequestedAmount / 100}$</span>
            </div>
            <div className="w-56">
              <Address
                operationType="withdrawal"
                network={props.withdrawal.originalNetworkProtocolName}
                token={props.withdrawal.originalNetworkToken}
                logoUrl={getTokenLogoUrl(props.withdrawal.originalNetworkToken)}
                fixedFee={props.withdrawal.originalNetworkFixedFee}
                percentFee={props.withdrawal.originalNetworkPercentFee}
                sizeLogo={16}
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
        ) : (
          <></>
        )}
      </div>

      <div className="flex md:hidden flex-col">
        <div className="flex text-md font-semibold flex-row items-center">
          <Icon src="rs-pencil" />
          <h3 className="pl-[20px]">
            {dict.withdrawal.draftMobile}{" "}
            {formatDate(props.withdrawal.emitDate, DateFormats.SHORT)}
          </h3>
        </div>
        {!props.isOpen ? (
          <div className="flex flew-row items-center text-md space-x-4 ml-4">
            <div>
              <span>{props.withdrawal.netRequestedAmount / 100}$</span>
            </div>
            <div className="">
              <Address
                operationType="withdrawal"
                network={props.withdrawal.originalNetworkProtocolName}
                token={props.withdrawal.originalNetworkToken}
                logoUrl={getTokenLogoUrl(props.withdrawal.originalNetworkToken)}
                fixedFee={props.withdrawal.originalNetworkFixedFee}
                percentFee={props.withdrawal.originalNetworkPercentFee}
                sizeLogo={16}
                inline
                padding
                shortAddress
              />
            </div>
            <span className="text-sm text-gray">
              {formatDate(
                props.withdrawal.estimatedProcessingDate,
                DateFormats.SHORT
              )}
            </span>
            <Tooltip label={dict.withdrawal.estimated} size="sm">
              <div className="mt-1 text-gray">
                <Icon src={"rs-info"}></Icon>
              </div>
            </Tooltip>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
