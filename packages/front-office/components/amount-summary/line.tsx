import { Icon } from "@shared-components/icon";
import { Tooltip } from "@shared-components/tooltip";
import { useLanguageDictionary } from "@shared-hooks";
import { ReactNode } from "react";

export default function Line(props: {
  label: string | ReactNode;
  value: number | string;
  percent?: number;
  tooltip?: boolean;
  isWithdrawal?: boolean;
}) {
  const dict = useLanguageDictionary();
  return (
    <div className="flex justify-between w-full">
      {props.percent ? (
        <>
          {props.label} ({props.percent}%)
        </>
      ) : (
        <div className="flex flex-row space-x-2">
          <p>
            <>{props.label}</>
          </p>
          {props.tooltip && (
            <Tooltip
              label={
                props.isWithdrawal
                  ? dict.withdrawal.tooltipAside
                  : dict.deposit.tooltipAside
              }
              size="lg"
            >
              <Icon className="mt-1 text-gray" src={"rs-info"} />
            </Tooltip>
          )}
        </div>
      )}
      <p className="flex justify-end">{props.value > 0 ? props.value : 0}$</p>
    </div>
  );
}
