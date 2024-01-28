import { useLanguageDictionary } from "@shared-hooks";

interface TooltipOperationProps {
  fixedFee: number;
  percentFee: number;
  operationType: "withdrawal" | "deposit";
}

export default function TooltipOperation(props: TooltipOperationProps) {
  const dict = useLanguageDictionary();

  return (
    <div>
      {props.fixedFee / 100}$ {dict[props.operationType].fixedFeeAnd}{" "}
      {props.percentFee}% {dict[props.operationType].percentFeeAdded}
    </div>
  );
}
