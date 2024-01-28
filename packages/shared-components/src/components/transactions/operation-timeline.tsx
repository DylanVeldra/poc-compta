import { DateTime } from 'luxon';
import { ReactNode } from 'react';

type Colors = 'gray' | 'gold' | 'green' | 'red';

export type OperationItem = {
  label: string;
  description?: string | ReactNode;
  colors: Colors;
  date: DateTime;
};

type OperationTimelineProps = {
  operations: OperationItem[];
};

function getColor(colors: Colors) {
  switch (colors) {
    case 'gray':
      return 'bg-gray';
    case 'gold':
      return 'bg-gold';
    case 'green':
      return 'bg-green';
    case 'red':
      return 'bg-red';
  }
}

export function OperationTimeline(props: OperationTimelineProps) {
  return (
    <div>
      {props.operations.map((operation, idx) => (
        <div key={idx} className="flex space-x-2 space-y-4">
          <div
            className={`invisible ${
              idx !== props.operations.length - 1 ? 'sm:visible' : 'invisible'
            } w-[2px] ${
              operation.description
                ? 'translate-y-[56px] h-[58px] sm:translate-y-[40px] sm:h-[52px]'
                : idx !== props.operations.length - 1 &&
                  props.operations[idx + 1].description
                ? 'translate-y-[36px] h-[47px]'
                : 'translate-y-[28px] h-[40px]'
            } bg-dark-gray translate-x-[14px]`}
          />
          <div
            className={`rounded-full w-[10px] h-[10px] z-10 self-center ${getColor(
              operation.colors,
            )}`}
          ></div>
          <div className="flex-1">
            <div>{operation.label}</div>
            {operation.description ? (
              <div className="text-gray">
                <>{operation.description}</>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="text-gray">
            {operation.date.toFormat('dd/MM/yyyy hh:mm:ss')}
          </div>
        </div>
      ))}
    </div>
  );
}
