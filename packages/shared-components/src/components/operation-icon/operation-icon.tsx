import { Icon } from '@shared-components/icon';
import { FinancialOperationType } from '@shared-types';

interface OperationIconProps {
  type: FinancialOperationType;
}
export default function OperationIcon(props: OperationIconProps) {
  const types = {
    deposit: {
      color: 'bg-light-green dark:bg-green dark:text-white text-green',
      src: 'rs-arrow-to-right',
    },
    withdrawal: {
      color: 'bg-light-red dark:bg-dark-red dark:text-white text-red',
      src: 'rs-arrow-from-right',
    },
    fees: {
      color: 'bg-light-gold dark:bg-gold dark:text-white text-gold',
      src: 'rs-percentage',
    },
  };
  return (
    <div
      className={`${
        types[props.type].color
      } w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] rounded-sm flex justify-center items-center`}
    >
      {props.type != 'fees' ? (
        <Icon src={types[props.type].src + ' text-sm md:text-md'} />
      ) : (
        <span className="text-gold dark:text-white">%</span>
      )}
    </div>
  );
}
