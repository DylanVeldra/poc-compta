import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { SingleLineInput } from "@shared-components/inputs";
import { useLanguageDictionary } from "@shared-hooks";
import ContainerWithTitle from "@shared-components/container-with-title/container-with-title";
import { DepositInformationsData } from "types";

interface DepositInformationsProps {
  onChange: (depositInformations: Partial<DepositInformationsData>) => void;
}

const DepositInformations = forwardRef(
  (props: DepositInformationsProps, ref: any) => {
    const [amount, setAmount] = useState<string>();
    const [transactionId, setTransactionId] = useState("");
    const [additionalInformations, setAdditionalInformations] = useState("");
    const [isMiddleInputSelected, setIsMiddleInputSelected] = useState(false);
    const dict = useLanguageDictionary();

    const changeAmount = (value: string) => {
      if (value.startsWith(".")) {
        value = "0" + value;
      }

      if (value !== "" && !/^[0-9]+\.?[0-9]{0,2}$/gm.test(value)) {
        return;
      }

      // Remove zero
      while (value.startsWith("0") && value.length > 1 && value[1] !== ".") {
        value = value.slice(1);
      }

      setAmount(value);
    };

    const emptyFields = () => {
      setAmount("0");
      setTransactionId(" ");
      setAdditionalInformations("");
    };

    useImperativeHandle(ref, () => ({
      emptyFields,
    }));

    useEffect(() => {
      props.onChange({
        rawDepositedAmount: Number(parseFloat(amount).toFixed(2)),
        transactionId,
        additionalInformations,
      });
    }, [amount, transactionId, additionalInformations]);

    return (
      <ContainerWithTitle
        step={3}
        title={dict.deposit.enterInformations}
        noBorder
      >
        <SingleLineInput
          type="number"
          label={
            <div className="flex space-x-3">
              <div>{dict.deposit.amount}</div>
              <div className="text-gray">{dict.deposit.minimum}</div>
            </div>
          }
          name="amount"
          value={amount?.toString()}
          onChange={changeAmount}
          icon={<span className="text-md">$</span>}
          rounded="rounded-t-md"
          noBorderBottom={isMiddleInputSelected}
          customIconPadding="focus:placeholder:mr-[0px] placeholder:-mr-[10px] pr-[24px]"
          placeholder={dict.deposit.amount}
        />
        <SingleLineInput
          label={dict.deposit.transactionId}
          name="transactionId"
          onChange={setTransactionId}
          value={transactionId}
          rounded="rounded-none"
          noBorderTop={true}
          noBorderBottom={true}
          onBlur={() => setIsMiddleInputSelected(false)}
          onFocus={() => setIsMiddleInputSelected(true)}
          placeholder={dict.deposit.transactionIdExample}
        />
        <SingleLineInput
          label={dict.deposit.additionalInformations}
          name="additionalInformations"
          onChange={setAdditionalInformations}
          value={additionalInformations}
          rounded="rounded-b-md"
          noBorderTop={isMiddleInputSelected}
          placeholder={dict.deposit.additionalInformationsExample}
        />
      </ContainerWithTitle>
    );
  }
);

DepositInformations.displayName = "DepositInformations";
export default DepositInformations;
