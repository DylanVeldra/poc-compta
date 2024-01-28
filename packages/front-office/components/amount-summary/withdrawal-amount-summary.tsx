import { ReactNode } from "react";
import { Container } from "@shared-components/container";
import Line from "./line";
import { Button } from "@shared-components/buttons";

interface WithdrawalAmountSummaryProps {
  onSubmit?: () => void;
  onDelete?: () => void;
  usdAmount: number;
  fixedFee: number;
  percentFee: number;
  finalAmount: number;
  amountLabel: string;
  fixedFeeLabel: string;
  percentFeeLabel: string;
  netAmountLabel: string;
  validationLabel: string;
  disableButton: boolean;
  children?: ReactNode;
}
export default function WithdrawalAmountSummary(
  props: WithdrawalAmountSummaryProps
) {
  const calculatedPercentFee = ((props.usdAmount * props.percentFee) / 100)
    .toFixed(2)
    .replace(/[.,]00$/, "");
  return (
    <Container>
      <div className="w-auto md:w-[257px] mx-4 md:mx-0 md:px-4 py-2.5 flex flex-col items-center text-md">
        <Line
          label={props.amountLabel}
          value={props.usdAmount.toFixed(2).replace(/[.,]00$/, "")}
        />
        <Line label={props.fixedFeeLabel} value={props.fixedFee / 100} />
        <Line
          label={props.percentFeeLabel}
          value={calculatedPercentFee}
          percent={props.percentFee}
        />
        <Line
          label={props.netAmountLabel}
          value={props.finalAmount.toFixed(2).replace(/[.,]00$/, "")}
          tooltip
          isWithdrawal
        />
        <div className="mt-3 w-full">
          <>
            {!props.children ? (
              <Button
                label={props.validationLabel}
                onClick={props.onSubmit}
                disabled={props.disableButton}
                size="md"
              />
            ) : (
              props.children
            )}
          </>
        </div>
      </div>
    </Container>
  );
}
