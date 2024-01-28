import { useRouter } from 'next/router';
import { useLanguageDictionary } from '@shared-hooks';
import { DepositDto } from '@shared-types';
import { getTokenLogoUrl, numberFormatter } from '@shared-utils';
import { FinancialOperationHeader } from '@shared-components/financial-operation-header';
import { Container } from '@shared-components/container';
import { Icon } from '@shared-components/icon';
import { Tooltip } from '@shared-components/tooltip';
import { Logo } from '@shared-components/logo';
import { CopyValueButton } from '@shared-components/copy-value-button';
import { DateTime } from 'luxon';
import Link from 'next/link';
import {
  OperationItem,
  OperationTimeline,
} from '@shared-components/transactions';

type DepositDetailedProps = {
  deposit: DepositDto;
  onClose: () => void;
};

export function DepositDetailed(props: DepositDetailedProps) {
  const dict = useLanguageDictionary();
  const router = useRouter();

  const generateTimeline = (deposit: DepositDto): OperationItem[] => {
    const { status } = deposit;
    const notificationCreated: OperationItem = {
      colors: 'gold',
      date: DateTime.fromISO(deposit.emitDate),
      label: dict.deposit.timeline.created,
    };

    if (status === 'PENDING') {
      return [notificationCreated];
    } else if (status === 'VALIDATED') {
      return [
        {
          colors: 'green',
          date: DateTime.fromISO(deposit.statusUpdateDate!),
          label: dict.deposit.timeline.done,
        },
        notificationCreated,
      ];
    } else if (status === 'CANCELLED') {
      return [
        {
          colors: 'gray',
          date: DateTime.fromISO(deposit.statusUpdateDate!),
          label: dict.deposit.timeline.cancelled,
        },
        notificationCreated,
      ];
    } else if (status === 'REFUSED') {
      return [
        {
          colors: 'red',
          date: DateTime.fromISO(deposit.statusUpdateDate!),
          label: dict.deposit.timeline.refused,
          description: (
            <div className="flex flex-col sm:flex-row space-x-1">
              <p>{`${dict.withdrawal.refusalReason}: "${deposit.refuseMotive}".`}</p>
              <p className="underline">
                <Link
                  href={'mailto:support@eovo.group'}
                >{`${dict.loginFields.contactSupport}`}</Link>
              </p>
            </div>
          ),
        },
        notificationCreated,
      ];
    }
    return [];
  };

  return (
    <>
      <FinancialOperationHeader
        title={dict.deposit.deposit}
        status={props.deposit.status}
        amount={props.deposit.rawDepositedAmount}
        id={props.deposit.publicId}
        type={'deposit'}
      />
      <div className="space-y-6 mt-2">
        <Container>
          <div className="p-3 space-y-2">
            <div className="flex">
              <div className="flex-1">{dict.deposit.grossAmount}</div>
              <div>
                {numberFormatter(
                  props.deposit.rawDepositedAmount / 100,
                  router.locale!,
                  '$',
                )}
              </div>
            </div>
            <div className="flex">
              <div className="flex-1">{dict.deposit.fixedFee}</div>
              <div>
                {numberFormatter(
                  props.deposit.originalAddressFixedFee / 100,
                  router.locale!,
                  '$',
                )}
              </div>
            </div>
            <div className="flex">
              <div className="flex-1">
                {dict.deposit.percentFee} (
                {props.deposit.originalAddressPercentFee}
                %)
              </div>
              <div>
                {numberFormatter(
                  (props.deposit.rawDepositedAmount *
                    props.deposit.originalAddressPercentFee) /
                    10000,
                  router.locale!,
                  '$',
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <div>{dict.deposit.netAmount}</div>
              <div>
                <Tooltip label={dict.deposit.tooltipAside} size="lg">
                  <div className="mt-0.5">
                    <Icon
                      src={'rs-info'}
                      className="text-dark-gray dark:text-silver text-sm"
                      inline
                    ></Icon>
                  </div>
                </Tooltip>
              </div>
              <div className="flex-1"></div>
              <div>
                {numberFormatter(
                  props.deposit.netCreditedAmount / 100,
                  'FR',
                  '$',
                )}
              </div>
            </div>
          </div>
        </Container>
        <Container>
          <div className="p-3 space-y-2">
            <div className="flex space-x-2">
              <div className="flex-1">{dict.deposit.depositAddress}</div>
              <div className="">
                <Logo
                  height={16}
                  width={16}
                  src={getTokenLogoUrl(props.deposit.originalAddressToken)}
                />
              </div>
              <div className="text-md">{props.deposit.originalAddressName}</div>
              <div className="text-gray text-md">
                ({props.deposit.originalAddressProtocolName})
              </div>
            </div>
            <div className="flex">
              <div className="mr-2">{dict.deposit.transactionId}</div>
              <div className="flex-1"></div>
              <div>
                <CopyValueButton
                  realValue={props.deposit.transactionId}
                  value={`${props.deposit.transactionId.substring(0, 4)}...
                    ${props.deposit.transactionId.substring(
                      props.deposit.transactionId.length - 7,
                    )}`}
                  justify="justify-start"
                />
              </div>
            </div>
          </div>
        </Container>
        {props.deposit.additionalInformations ? (
          <Container>
            <div className="p-3 space-y-2">
              <div className="flex">
                <div className="mr-2">
                  {dict.deposit.additionalInformations}
                </div>
                <div className="flex-1 text-right">
                  {props.deposit.additionalInformations}
                </div>
              </div>
            </div>
          </Container>
        ) : (
          <></>
        )}
        <p className="text-[16px] font-semibold">
          {dict.deposit.transactionHistory}
        </p>
      </div>
      <OperationTimeline operations={generateTimeline(props.deposit)} />
    </>
  );
}
