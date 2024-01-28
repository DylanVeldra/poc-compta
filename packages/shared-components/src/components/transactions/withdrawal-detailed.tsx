import { useRouter } from 'next/router';
import { useLanguageDictionary } from '@shared-hooks';
import { WithdrawalDto } from '@shared-types';
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

type WithdrawalDetailedProps = {
  withdrawal: WithdrawalDto;
  onClose: () => void;
};

export function WithdrawalDetailed(props: WithdrawalDetailedProps) {
  const dict = useLanguageDictionary();
  const router = useRouter();

  const generateTimeline = (withdrawal: WithdrawalDto): OperationItem[] => {
    const { status } = withdrawal;
    const notificationCreated: OperationItem = {
      colors: 'gold',
      date: DateTime.fromISO(withdrawal.emitDate),
      label: dict.withdrawal.timeline.created,
    };

    if (status === 'PENDING') {
      return [notificationCreated];
    } else if (status === 'VALIDATED') {
      return [
        {
          colors: 'green',
          date: DateTime.fromISO(withdrawal.statusUpdateDate!),
          label: dict.withdrawal.timeline.done,
        },
        notificationCreated,
      ];
    } else if (status === 'CANCELLED') {
      return [
        {
          colors: 'gray',
          date: DateTime.fromISO(withdrawal.statusUpdateDate!),
          label: dict.withdrawal.timeline.cancelled,
        },
        notificationCreated,
      ];
    } else if (status === 'REFUSED') {
      return [
        {
          colors: 'red',
          date: DateTime.fromISO(withdrawal.statusUpdateDate!),
          label: dict.withdrawal.timeline.refused,
          description: (
            <div className="flex flex-col sm:flex-row space-x-1">
              <p>{`${dict.withdrawal.refusalReason}: "${withdrawal.refuseMotive}".`}</p>
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
    } else if (status === 'DRAFT') {
      return [
        {
          colors: 'gold',
          date: DateTime.fromISO(withdrawal.emitDate!),
          label: dict.withdrawal.timeline.draft,
        },
      ];
    }
    return [];
  };

  return (
    <>
      <FinancialOperationHeader
        title={dict.withdrawal.withdrawal}
        status={props.withdrawal.status}
        amount={props.withdrawal.netRequestedAmount}
        id={props.withdrawal.publicId}
        type={'withdrawal'}
      />
      <div className="space-y-6 mt-2">
        <Container>
          <div className="p-3 space-y-2">
            <div className="flex">
              <div className="flex-1">{dict.withdrawal.netRequestedAmount}</div>
              <div>
                {numberFormatter(
                  props.withdrawal.netRequestedAmount / 100,
                  router.locale!,
                  '$',
                )}
              </div>
            </div>
            <div className="flex">
              <div className="flex-1">{dict.deposit.fixedFee}</div>
              <div>
                {numberFormatter(
                  props.withdrawal.originalNetworkFixedFee / 100,
                  router.locale!,
                  '$',
                )}
              </div>
            </div>
            <div className="flex">
              <div className="flex-1">
                {dict.deposit.percentFee} (
                {props.withdrawal.originalNetworkPercentFee}
                %)
              </div>
              <div>
                {numberFormatter(
                  (props.withdrawal.netRequestedAmount *
                    props.withdrawal.originalNetworkPercentFee) /
                    10000,
                  router.locale!,
                  '$',
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <div>{dict.withdrawal.netAmountSolded}</div>
              <div>
                <Tooltip label={dict.withdrawal.tooltipAside} size="lg">
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
                  props.withdrawal.rawDebitedAmount / 100,
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
              <div className="flex-1">{dict.address.protocolName}</div>
              <div className="">
                <Logo
                  height={16}
                  width={16}
                  src={getTokenLogoUrl(props.withdrawal.originalNetworkToken)}
                />
              </div>
              <div className="text-md">
                {props.withdrawal.originalNetworkProtocolName}
              </div>
            </div>
            <div className="flex">
              <div className="mr-2">{dict.address.address}</div>
              <div className="flex-1"></div>
              <div>
                <CopyValueButton
                  realValue={props.withdrawal.emitterAddress}
                  value={props.withdrawal.emitterAddress}
                />
              </div>
            </div>
          </div>
        </Container>
        {props.withdrawal.transactionId ? (
          <Container>
            <div className="p-3 space-y-2">
              <div className="flex">
                <div className="mr-2">{dict.withdrawal.transactionId}</div>
                <div className="flex-1"></div>
                <div>
                  <CopyValueButton
                    realValue={props.withdrawal.transactionId}
                    value={props.withdrawal.transactionId}
                  />
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
      <OperationTimeline operations={generateTimeline(props.withdrawal)} />
    </>
  );
}
