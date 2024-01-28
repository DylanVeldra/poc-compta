import { Container } from "@shared-components/container";
import { GradientBorder } from "@shared-components/gradient-border";
import { OperationIcon } from "@shared-components/operation-icon";
import { useLanguageDictionary } from "@shared-hooks";
import { formatAmount } from "@shared-utils";
import { Logo } from "@shared-components/logo";
import { FinancialOperationType } from "@shared-types";

interface PendingOperationProps {
  operationType: FinancialOperationType;
  amount: number;
  date: string;
  logoUrl: string;
}

export default function PendingOperation(props: PendingOperationProps) {
  const dict = useLanguageDictionary();

  return (
    <GradientBorder>
      <Container noBorder>
        <div className="flex px-[17px] py-[5px] justify-between items-center">
          <div className="flex items-center">
            <OperationIcon type={props.operationType} />
            <div className="ml-[20px]">
              <p className="font-semibold">
                {dict.months[new Date(props.date).getMonth()]}
              </p>
              <p>
                {props.operationType === "deposit"
                  ? dict.dashboard.pendingDeposit
                  : dict.dashboard.pendingWithdrawal}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <p className="mr-[13px] text-gold">
              {props.operationType === "deposit" ? "+" : "-"}
              {formatAmount(props.amount / 100)}
            </p>
            <Logo src={props.logoUrl} width={16} height={16} />
          </div>
        </div>
      </Container>
    </GradientBorder>
  );
}
