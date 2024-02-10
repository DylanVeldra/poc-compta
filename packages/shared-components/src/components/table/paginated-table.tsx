import { Pagination } from '@shared-components/pagination';
import { ReactNode } from 'react';
import Table from './table';

interface TableProps {
  headers: { [key: string]: string };
  data: unknown[];
  customHeaders?: { [key: string]: (label: string) => ReactNode };
  customColumns?: { [key: string]: (object: any) => ReactNode };
  emptyMessage: string;
  nbPages: number;
  pageSize: number;
  onCurrentPageChange: (current: number) => void;
  onLineClick?: (object: any) => void;
}
export default function PaginatedTable(props: TableProps) {
  return (
    <>
      <Table {...props} data={props.data.slice(0, props.pageSize)} />
      {props.nbPages > 1 ? (
        <Pagination
          length={props.nbPages}
          displayQuantity={5}
          onCurrentChange={props.onCurrentPageChange}
        />
      ) : (
        <></>
      )}
    </>
  );
}
