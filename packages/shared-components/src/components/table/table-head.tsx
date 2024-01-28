import { ReactNode } from "react";

interface TableHeadProps {
  headers: { [key: string]: string };
  customHeaders?: { [key: string]: (label: string) => ReactNode };
}
export default function TableHead(props: TableHeadProps) {
  return (
    <thead>
      <tr className="">
        {Object.keys(props.headers).map((key, i) => {
          if (props.customHeaders?.[key]) {
            return (
              <th
                className={`sm:max-w-auto text-sm sm:text-md px-2 py-[8px] font-normal text-left ${
                  i === 0 ? "pl-3 sm:pl-5" : ""
                }`}
                key={key}
              >
                <>{props.customHeaders[key](props.headers[key])}</>
              </th>
            );
          }
          return (
            <th
              className={`sm:max-w-auto text-sm sm:text-md px-2 py-[8px] font-normal text-left ${
                i === 0 ? "pl-3 sm:pl-5" : ""
              }`}
              key={key}
            >
              {props.headers[key]}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
