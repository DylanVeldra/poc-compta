import { Icon } from '@shared-components/icon';
import { useLanguageDictionary } from '@shared-hooks';
import { useState, useEffect } from 'react';
import { TableBody } from '../table-body';
import { TableHead } from '../table-head';
import { BalanceEntry } from '@shared-types';
import { getStartMonth } from '@shared-utils';
import { DateTime } from 'luxon';

interface ProfitsTableProps {
  performanceData: BalanceEntry[];
}

const ProfitsTable = (props: ProfitsTableProps) => {
  const dict = useLanguageDictionary();

  const [endDate, setEndDate] = useState<DateTime>(
    DateTime.now().endOf('month'),
  );

  const [startDate, setStartDate] = useState<DateTime>(
    DateTime.now().startOf('month'),
  );

  const [displayMode, setDisplayMode] = useState<'$' | '%'>('$');

  useEffect(() => {
    setStartDate(getStartMonth(window.innerWidth, endDate));

    const onResize = (e: any) => {
      setEndDate(DateTime.now().endOf('month')),
        setStartDate(getStartMonth(e.target.innerWidth, endDate));
    };
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="w-full flex flex-col mt-[40px] md:mt-[70px]">
      <div className="flex justify-between items-end mb-6 mr-0.5 relative">
        <div className="flex flex-col">
          <h4 className="text-lg font-semibold mb-[22px]">
            {dict.performanceMonitoring.profitDetails}
          </h4>
          <h4 className="text-[16px] font-semibold">
            {dict.months[startDate.month - 1].slice(0, 3) +
              ' ' +
              startDate.year}
            {' - '}
            {dict.months[endDate.month - 1].slice(0, 3) + ' ' + endDate.year}
          </h4>
        </div>
        <div className="flex items-center">
          <button
            disabled={
              !props.performanceData.length ||
              startDate <= DateTime.fromISO(props.performanceData[0].date)
            }
            className={`flex w-[34px] h-[34px] items-center justify-center rounded-sm bg-white dark:bg-dark-gray ${
              !props.performanceData.length ||
              startDate <= DateTime.fromISO(props.performanceData[0].date)
                ? 'cursor-not-allowed text-gray'
                : ''
            } w-[34px] h-[34px]`}
            onClick={() => {
              setEndDate(endDate.minus({ months: 1 }).endOf('month'));
              setStartDate(startDate.minus({ months: 1 }).startOf('month'));
            }}
          >
            <Icon src="rs-angle-left" className="text-xs" />
          </button>
          <button
            disabled={
              endDate.year === DateTime.now().year &&
              endDate.month === DateTime.now().month
            }
            className={`flex w-[34px] h-[34px] items-center justify-center rounded-sm bg-white dark:bg-dark-gray ${
              endDate.year === DateTime.now().year &&
              endDate.month === DateTime.now().month
                ? 'cursor-not-allowed text-gray'
                : ''
            } w-[34px] h-[34px] ml-[10px]`}
            onClick={() => {
              setEndDate(endDate.plus({ months: 1 }).endOf('month'));
              setStartDate(startDate.plus({ months: 1 }).startOf('month'));
            }}
          >
            <Icon src="rs-angle-right" className="text-xs" />
          </button>
        </div>
        <div className="flex items-center">
          <div className="flex items-center justify-center bg-white dark:bg-dark-gray rounded-sm w-[64px] h-[34px]">
            <button
              onClick={() => setDisplayMode('%')}
              className={`${
                displayMode === '%' && 'bg-gold text-white'
              } w-[30px] h-[30px] rounded-sm`}
            >
              %
            </button>
            <button
              onClick={() => setDisplayMode('$')}
              className={`${
                displayMode === '$' && 'bg-gold text-white'
              } w-[30px] h-[30px] rounded-sm`}
            >
              $
            </button>
          </div>
        </div>
      </div>

      <div className="w-full bg-gradient-to-r from-gold p-[1px] rounded-sm">
        <div className="h-full rounded-sm flex flex-col relative shadow-light dark:shadow-dark">
          <TableHead start={startDate} end={endDate} />
          <TableBody
            displayMode={displayMode}
            start={startDate}
            end={endDate}
            performanceData={props.performanceData}
          />
        </div>
      </div>

      <div className="w-full mt-[30px] flex justify-center items-center relative">
        <div className="flex items-center left-1/2 top-[20px] absolute">
          <button
            disabled={
              !props.performanceData.length ||
              startDate <= DateTime.fromISO(props.performanceData[0].date)
            }
            className={`flex w-[34px] h-[34px] items-center justify-center rounded-sm bg-white dark:bg-dark-gray ${
              !props.performanceData.length ||
              startDate <= DateTime.fromISO(props.performanceData[0].date)
                ? 'cursor-not-allowed text-gray'
                : ''
            } w-[34px] h-[34px]`}
            onClick={() => {
              setEndDate(endDate.minus({ months: 1 }).endOf('month'));
              setStartDate(startDate.minus({ months: 1 }).startOf('month'));
            }}
          >
            <Icon src="rs-angle-left" className="text-xs" />
          </button>
          <button
            disabled={
              endDate.year === DateTime.now().year &&
              endDate.month === DateTime.now().month
            }
            className={`flex w-[34px] h-[34px] items-center justify-center rounded-sm bg-white dark:bg-dark-gray ${
              endDate.year === DateTime.now().year &&
              endDate.month === DateTime.now().month
                ? 'cursor-not-allowed text-gray'
                : ''
            } w-[34px] h-[34px] ml-[10px]`}
            onClick={() => {
              setEndDate(endDate.plus({ months: 1 }).endOf('month'));
              setStartDate(startDate.plus({ months: 1 }).startOf('month'));
            }}
          >
            <Icon src="rs-angle-right" className="text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfitsTable;
