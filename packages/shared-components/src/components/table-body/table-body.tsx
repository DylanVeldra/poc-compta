import { useState, useEffect } from 'react';
import { BalanceEntry } from '@shared-types';

// Helpers
import { formatAmount } from '@shared-utils';
import { useLanguageDictionary } from '@shared-hooks';
import { Tooltip } from '@shared-components/tooltip';
import { DateTime } from 'luxon';

interface TableBodyProps {
  performanceData: BalanceEntry[];
  start: DateTime;
  end: DateTime;
  displayMode: '$' | '%';
}

const TableBody = (props: TableBodyProps) => {
  const dict = useLanguageDictionary();
  const [isData, setIsData] = useState(false);
  const [data, setData] = useState<BalanceEntry[][]>([]);

  useEffect(() => {
    if (props.performanceData.length) {
      const dataToDisplay: BalanceEntry[][] = [];
      let monthIndex = -1;
      let lastInsertedMonth: null | number = null;

      // Take ~5-20ms
      const emptyColumns = DateTime.fromISO(props.performanceData[0].date).diff(
        props.start,
        ['months', 'days'],
      ).months;

      for (let i = 0; i < emptyColumns; i++) {
        dataToDisplay.push([]);
        monthIndex++;
      }
      props.performanceData.filter((item: BalanceEntry) => {
        const date = DateTime.fromISO(item.date);
        if (date >= props.start && date <= props.end) {
          if (lastInsertedMonth !== date.month) {
            dataToDisplay.push([]);
            monthIndex++;
          }
          dataToDisplay[monthIndex].push(item);
          lastInsertedMonth = date.month;
        }
      });
      setData(dataToDisplay);
      setIsData(true);
    } else {
      setIsData(false);
    }
  }, [props.performanceData, props.start, props.end]);

  const getClass = (item: BalanceEntry) => {
    if (!item.rawBalance) return 'absolute right-1/3 text-gray';

    if (item.transactions.some((transaction) => transaction.type === 'DEPOSIT'))
      return 'text-orange';
    return item.perf === 0
      ? 'text-green'
      : item.perf > 0
      ? 'text-green'
      : 'text-red';
  };

  const generateDots = (item: BalanceEntry) => {
    if (item.transactions) {
      let properties = {
        labels: {
          DEPOSIT: dict.deposit.deposit + ': +',
          WITHDRAWAL: dict.withdrawal.withdrawal + ': -',
          FEES: dict.deposit.fees + ' EOVO: -',
        },
        colors: {
          DEPOSIT: 'green',
          WITHDRAWAL: 'darker-red',
          FEES: 'gold',
        },
      };

      return (
        <Tooltip
          size="md"
          label={
            <div className="flex flex-col">
              {item.transactions.map((transaction, idx) => (
                <div className="text-sm" key={idx}>
                  {properties.labels[transaction.type] +
                    formatAmount(transaction.amount / 100)}
                </div>
              ))}
            </div>
          }
        >
          <div className="flex relative">
            {item.transactions.map((transaction, index) => (
              <div
                key={index}
                className={`w-[12px] h-[12px] rounded-full bg-${
                  properties.colors[transaction.type]
                } ${index > 0 ? '-ml-1' : ''}`}
              ></div>
            ))}
          </div>
        </Tooltip>
      );
    }
  };

  return (
    <div
      className={`mt-[1px] w-full bg-white dark:bg-fake-black p-[21px] border-gradient-to-r from-gold ${
        isData
          ? 'grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 2lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 3xl:grid-cols-8 gap-x-6'
          : 'flex items-center justify-center'
      }`}
    >
      {!isData ? (
        <div className="mx-auto flex flex-col items-center justify-center text-center max-w-[288px] my-[60px]">
          <p className="text-[15px] text-gray">
            {dict.performanceMonitoring.noData}
          </p>
          <p className="text-[15px] text-gray">
            {dict.performanceMonitoring.makeADeposit}
          </p>
        </div>
      ) : (
        <>
          {data.map((array, i) => (
            <div className="flex flex-col" key={i}>
              {array.map((item, x) => (
                <div
                  key={item.date}
                  className="mb-[8px] bg-fake-white dark:bg-dark-gray flex justify-center items-center relative h-[34px] w-[140px] mx-auto rounded-sm"
                >
                  <p className="absolute left-[7px] top-1/2 -translate-y-1/2 text-[13px]">
                    {x + 1}
                  </p>
                  {props.displayMode === '$' ? (
                    <>
                      <p className={`text-[15px] ${getClass(item)}`}>
                        {item.rawBalance ? item.rawBalance / 100 + '$' : '-'}
                      </p>
                      <div className="absolute right-[10px]">
                        {generateDots(item)}
                      </div>
                    </>
                  ) : (
                    <p
                      className={`text-[15px]
                      ${item.perf == 0 && 'text-orange'}
                      ${item.perf > 0 && 'text-green'}
                      ${item.perf < 0 && 'text-red'}
                    `}
                    >
                      {item.perf}%
                    </p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default TableBody;
