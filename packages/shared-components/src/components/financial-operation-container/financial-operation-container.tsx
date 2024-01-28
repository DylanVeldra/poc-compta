import { ReactNode } from "react";
import { SubWindow } from "@shared-components/sub-window";

interface FinancialOperationContainerProps {
  header: ReactNode;
  children: ReactNode;
}
export default function FinancialOperationContainer(
  props: FinancialOperationContainerProps
) {
  return (
    <div className="my-10">
      <SubWindow header={props.header}>
        <div className="lg:grid lg:grid-cols-2 gap-x-[100px]">
          <>{props.children}</>
        </div>
      </SubWindow>
    </div>
  );
}
