import { ReactNode } from "react";
import { Icon } from "@shared-components/icon";

interface FinancialOperationLineProps {
  label: string;
  value?: string | number | ReactNode;
  icon?: string;
  isError?: boolean;
}
export default function FinancialOperationLine(
  props: FinancialOperationLineProps
) {
  const textColor = props.isError ? "text-red" : "text-gold";
  return (
    <div className="flex mb-[29px]">
      <p
        className={`${textColor} flex font-semibold w-[220px] mr-[60px] items-center`}
      >
        {props.label}
      </p>
      <div className="flex items-center text-dark-gray dark:text-white w-full overflow-scroll text-ellipsis text-[15px]">
        <>
          {props.value ?? "-"}
          {props.icon && (
            <Icon src={props.icon} className="w-5 h-5 cursor-pointer mr-2" />
          )}
        </>
      </div>
    </div>
  );
}
