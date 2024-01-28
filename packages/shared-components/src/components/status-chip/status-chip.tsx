import { useLanguageDictionary } from '@shared-hooks';
import { FinancialOperationStatus } from '@shared-types';

type Color = 'primary' | 'secondary';
interface StatusChipProps {
  status: FinancialOperationStatus;
  color?: Color;
}

export default function StatusChip(props: StatusChipProps) {
  const dict = useLanguageDictionary();
  const colors = {
    DRAFT: 'bg-fake-white text-black dark:text-white',
    PENDING: 'bg-fake-white text-black dark:text-white',
    DONE: 'bg-light-green text-green dark:text-dark-green',
    CANCELLED: 'bg-fake-white text-silver',
    REFUSED: 'bg-light-red text-red',
    VALIDATED: 'bg-light-green text-green',
  };

  return (
    <>
      <div
        className={`flex flex-col justify-center w-[110px] h-[30px] text-md text-center ${
          props.color === 'secondary' ? 'bg-dark-gray' : 'dark:bg-fake-black'
        } ${colors[props.status]} rounded-md`}
      >
        <div className={`text-${colors[props.status]}`}>
          {dict.status[props.status]}
        </div>
      </div>
    </>
  );
}
