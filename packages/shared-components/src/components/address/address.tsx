import { Icon } from '@shared-components/icon';
import { Logo } from '@shared-components/logo';
import { Tooltip } from '@shared-components/tooltip';
import { useLanguageDictionary } from '@shared-hooks';
import { formatNetwork, getAcronym } from '@shared-utils';
import TooltipOperation from './tooltip-operation';

interface AddressProps {
  logoUrl: string;
  network: string;
  token: string;
  fixedFee: number;
  percentFee: number;
  padding?: boolean;
  inline?: boolean;
  shortAddress?: boolean;
  sizeLogo?: number;
  isWithdrawalAddress?: boolean;
  operationType: 'withdrawal' | 'deposit';
}

export default function Address(props: AddressProps) {
  const acronym = getAcronym(props.network);
  const percentFeeWithComma = props.percentFee.toString().replace(/\./, '.');
  const dict = useLanguageDictionary();
  return (
    <div className={`flex flex-row items-center w-full space-x-4`}>
      <div className="flex flex-row items-center space-x-4 md:space-x-4">
        <div className="mt-1">
          <Logo
            width={props.sizeLogo ?? 32}
            height={props.sizeLogo ?? 32}
            src={props.logoUrl}
          />
        </div>
        {props.token && (
          <div className="hidden md:flex flex-col">
            <span>{props.token}</span>
          </div>
        )}
        {props.network && (
          <div className="flex flex-row space-x-2 items-center md:ml-6 md:mr-0">
            <span className="">{acronym}</span>
            <span className="text-sm text-gray">{props.network}</span>
          </div>
        )}
      </div>
      {!props.shortAddress && (
        <div className="flex flex-row justify-end space-x-2">
          {props.fixedFee && props.percentFee && (
            <div className="flex flex-row space-x-1 md:space-x-2 text-sm md:text-md">
              <span className="">
                {props.fixedFee / 100}$ + {percentFeeWithComma}%
              </span>
              <Tooltip
                label={
                  props.isWithdrawalAddress ? (
                    dict.tooltip.net
                  ) : (
                    <TooltipOperation
                      operationType={props.operationType}
                      fixedFee={props.fixedFee}
                      percentFee={props.percentFee}
                    />
                  )
                }
                size="lg"
              >
                <div className="mt-0.5">
                  <Icon
                    src={'rs-info'}
                    className="mt-2 text-dark-gray dark:text-silver text-sm"
                    inline
                  ></Icon>
                </div>
              </Tooltip>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
