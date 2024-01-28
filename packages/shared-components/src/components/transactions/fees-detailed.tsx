import { useRouter } from 'next/router';
import { useLanguageDictionary } from '@shared-hooks';
import { FeesDto } from '@shared-types';
import { numberFormatter } from '@shared-utils';
import { FinancialOperationHeader } from '@shared-components/financial-operation-header';
import { Container } from '@shared-components/container';
import { DateTime } from 'luxon';
import {
  OperationItem,
  OperationTimeline,
} from '@shared-components/transactions';

type FeesDetailedProps = {
  fees: FeesDto;
  onClose: () => void;
};

export function FeesDetailed(props: FeesDetailedProps) {
  const dict = useLanguageDictionary();
  const router = useRouter();

  const generateTimeline = (): OperationItem[] => {
    return [
      {
        colors: 'gold',
        date: DateTime.fromISO(props.fees.createdAt!),
        label: dict.fees.timeline.created,
      },
    ];
  };

  return (
    <>
      <FinancialOperationHeader
        title={dict.deposit.fees}
        status={'DONE'}
        amount={props.fees.amount}
        id={props.fees.publicId}
        type={'fees'}
      />
      <div className="space-y-6 mt-2">
        <Container>
          <div className="p-3 space-y-2">
            <div className="flex">
              <div className="flex-1">{dict.fees.amountBilled}</div>
              <div>
                {numberFormatter(props.fees.amount / 100, router.locale!, '$')}
              </div>
            </div>
          </div>
        </Container>
        <p className="text-[16px] font-semibold">
          {dict.deposit.transactionHistory}
        </p>
      </div>
      <OperationTimeline operations={generateTimeline()} />
    </>
  );
}
