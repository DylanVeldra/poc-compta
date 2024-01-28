import { OperationIcon } from '@shared-components/operation-icon';
import { StatusChip } from '@shared-components/status-chip';
import {
  FinancialOperationStatus,
  FinancialOperationType,
} from '@shared-types';

interface FinancialOperationHeaderProps {
  status: FinancialOperationStatus;
  title: string;
  amount: number;
  id: string;
  type: FinancialOperationType;
}
export default function FinancialOperationHeader(
  props: FinancialOperationHeaderProps,
) {
  return (
    <div className="flex justify-center md:justify-between md:items-center py-[17px]">
      <div className="flex items-center space-x-4 md:space-x-0 w-full">
        <OperationIcon type={props.type} />
        <h3 className="text-lg font-semibold md:mr-[94px] pl-[10px]">
          {props.title} #{props.id}
        </h3>
        <div className="flex-1"></div>
        <StatusChip color="secondary" status={props.status} />
      </div>
    </div>
  );
}
