import { ReactNode } from 'react';
import TableBody from './table-body';
import TableHead from './table-head';

interface TableProps {
  headers: { [key: string]: string };
  data: any[];
  customHeaders?: { [key: string]: (label: string) => ReactNode };
  customColumns?: { [key: string]: (object: any) => ReactNode };
  emptyMessage: string;
  onLineClick?: (object: any) => void;
}
export default function Table(props: TableProps) {
  if (props.data.length === 0) {
    return (
      <p className="text-center text-gray bg-fake-white dark:bg-fake-black text-[15px] h-[156px] flex justify-center items-center relative z-[10] mt-1 shadow-light dark:shadow-dark">
        {props.emptyMessage}
      </p>
    );
  }
  return (
    <table className="shadow-light dark:shadow-dark w-full text-md">
      <TableHead headers={props.headers} customHeaders={props.customHeaders} />
      <TableBody
        data={props.data}
        keys={Object.keys(props.headers)}
        customColumns={props.customColumns}
        onLineClick={props.onLineClick}
      />
    </table>
  );
}
