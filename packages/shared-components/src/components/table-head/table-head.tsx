import { useLanguageDictionary } from '@shared-hooks';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
interface TableHeadProps {
  start: DateTime;
  end: DateTime;
}

const TableHead = (props: TableHeadProps) => {
  const dict = useLanguageDictionary();
  const [monthsToDisplay, setMonthsToDisplay] = useState<DateTime[]>([]);

  useEffect(() => {
    const months = [];
    for (
      let idx = props.start;
      idx <= props.end;
      idx = idx.plus({ months: 1 })
    ) {
      months.push(idx);
    }
    setMonthsToDisplay(months);
  }, [props.start, props.end]);

  return (
    <div
      className={`w-full p-[21px] bg-fake-white dark:bg-dark-gray
        grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 2lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 3xl:grid-cols-8
        gap-x-6 justify-items-center`}
    >
      {monthsToDisplay.map((item) => (
        <p key={item.toISO()}>
          {dict.months[item.month - 1] + ' ' + item.year}
        </p>
      ))}
    </div>
  );
};

export default TableHead;
