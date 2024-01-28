// Components
import { Icon } from "@shared-components/icon";
import { GradientBorder } from "@shared-components/gradient-border";

interface PerformanceChartProps {
  previousMonthsData: Array<MonthProps>;
  indexes: { start: number; end: number };
  columnsInfo: Array<object>;
  toggleColumnsInfo: (v: Array<object>) => void;
  setShowModal: (v: boolean) => void;
  setDetails: (v: any) => void;
}

interface MonthProps {
  year: number | string;
  month: string;
  index: number;
}

const TableHead = (props: PerformanceChartProps) => {
  const updateLockedColums = (item: any, itemIndex: number) => {
    props.setDetails(() => ({
      month: item.index,
      year: item.year,
      index: itemIndex
    }));
    
    props.setShowModal(true);
  };

  const getStatus = (startIndex: number, index: number) => {
    if(props.columnsInfo) {
      let object: any = props.columnsInfo[startIndex + index];
      
      if(object) {
        return object.status 
      }
    }
    return 'NOT_APPLICABLE';
  }

  return (
    <GradientBorder>
      <div className="w-full p-[21px] rounded-r-sm rounded-tl-sm rounded-bl-none bg-white dark:bg-dark-gray 
            grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 2lg:grid-cols-5 xl:grid-cols-6 
            2xl:grid-cols-7 3xl:grid-cols-8 gap-x-6 justify-items-start"
      >
        {props.previousMonthsData
          .slice(props.indexes.start, props.indexes.end)
          .map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-full max-w-[122px] w-full mx-auto"
            >
              <p key={item.month}>{item.month.slice(0, 3) + " " + item.year}</p>
              <div
                className={`flex justify-center items-center rounded-sm mx-2 px-1.5 py-1.5 
                  ${ getStatus(props.indexes.start, index) === 'TODO' && "bg-gold"}
                  ${ getStatus(props.indexes.start, index) === 'NOT_APPLICABLE' && "bg-silver"}
                  ${ getStatus(props.indexes.start, index) === 'DONE' && ""}
                `}
              >
                  <button
                    className={`w-4 h-4 text-lg flex items-center justify-center text-fake-black`}
                    onClick={
                      getStatus(props.indexes.start, index) === 'TODO'
                      ? () => updateLockedColums(item, (+props.indexes.start + +index))
                      : undefined
                    }
                    >
                    <Icon src={getStatus(props.indexes.start, index) === 'DONE' ? "rs-lock" : "rs-unlock"} 
                      className={`${getStatus(props.indexes.start, index) === 'TODO' && "text-white dark:text-black"}
                                  ${getStatus(props.indexes.start, index) === 'NOT_APPLICABLE' && "cursor-not-allowed text-white dark:text-black"} 
                                  ${getStatus(props.indexes.start, index) === 'DONE' && "cursor-not-allowed text-silver dark:text-gray"}
                        `}/>
                  </button>
              </div>
            </div>
          ))}

      </div>
    </GradientBorder>
  );
};

export default TableHead;
