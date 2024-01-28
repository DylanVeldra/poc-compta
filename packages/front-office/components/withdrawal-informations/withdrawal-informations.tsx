import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { SingleLineInput } from "@shared-components/inputs";
import { useLanguageDictionary } from "@shared-hooks";
import ContainerWithTitle from "@shared-components/container-with-title/container-with-title";
import { WithdrawalDto } from "../../../shared-components/src/types/WithdrawalDto";
import { AddressDto } from "@shared-types";

interface WithdrawalInformationsProps {
  onChange: (withdrawalInformations: WithdrawalDto) => void;
  updateAddressObject?: (
    name: "emitterAddress" | "netRequestedAmount",
    value: string | number
  ) => void;
  withdrawal?: WithdrawalDto;
  address?: AddressDto;
  errors?: {
    emitterAddress?: {
      message?: string;
    };
    netRequestedAmount?: {
      message?: string;
    };
  };
}

const WithdrawalInformations = forwardRef(
  (props: WithdrawalInformationsProps, ref) => {
    const defaultAmount = (props.withdrawal?.netRequestedAmount ?? 0) / 100;
    const [netRequestedAmount, setNetRequestedAmount] = useState("");
    const [emitterAddress, setEmitterAddress] = useState(
      props.withdrawal?.emitterAddress ?? ""
    );
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

      setNetRequestedAmount(value);
    };

    const emptyFields = () => {
      setNetRequestedAmount("0");
      setEmitterAddress("");
    };

    useImperativeHandle(ref, () => ({
      emptyFields,
    }));

    useEffect(() => {
      const feesToInject = {
        originalNetworkFixedFee: props.address?.fixedFee,
        originalNetworkPercentFee: props.address?.percentFee,
      };
      props.onChange({
        ...props.withdrawal,
        ...(props.address ? feesToInject : {}),
        netRequestedAmount: Number(netRequestedAmount) * 100,
        originalNetworkFixedFee: props?.address?.fixedFee,
        originalNetworkPercentFee: props?.address?.percentFee,
        rawDebitedAmount:
          Number(netRequestedAmount) * 100 +
          (props?.address?.fixedFee ??
            props.withdrawal?.originalNetworkFixedFee) +
          Number(netRequestedAmount) *
            100 *
            ((props?.address?.percentFee ??
              props.withdrawal?.originalNetworkPercentFee) /
              100),
        emitterAddress,
      });
    }, [netRequestedAmount, emitterAddress]);

    return (
      <>
        <div className="flex flex-col space-y-10 md:space-y-6 mb-10 md:mb-0">
          <ContainerWithTitle
            step={2}
            title={dict.withdrawal.yourAddress}
            noBorder
          >
            <SingleLineInput
              label={dict.withdrawal.personnalAddress}
              placeholder={dict.withdrawal.examplePersonnalAddress}
              name="emitterAddress"
              onChange={(e) => {
                setEmitterAddress(e);
                props.updateAddressObject("emitterAddress", e);
              }}
              type="text"
              borders={true}
              value={emitterAddress}
              rounded="rounded-md"
              errorMessage={
                props.errors ? props.errors.emitterAddress?.message : ""
              }
            />
          </ContainerWithTitle>
          <ContainerWithTitle
            step={3}
            title={dict.withdrawal.yourWithdrawal}
            noBorder
          >
            <SingleLineInput
              type="number"
              label={
                <div className="flex space-x-3">
                  <div>{dict.withdrawal.amountToWithdrawal}</div>
                  <div className="text-gray">{dict.withdrawal.minimum}</div>
                </div>
              }
              name="netRequestedAmount"
              placeholder={dict.withdrawal.amountToWithdrawal}
              value={netRequestedAmount}
              onChange={changeAmount}
              borders={true}
              icon={<span className="text-md">$</span>}
              rounded="rounded-md"
              customIconPadding="focus:placeholder:mr-[0px] placeholder:-mr-[10px] pr-[24px]"
              errorMessage={
                props.errors ? props.errors.netRequestedAmount?.message : ""
              }
            />
          </ContainerWithTitle>
        </div>
      </>
    );
  }
);

WithdrawalInformations.displayName = "WithdrawalInformations";
export default WithdrawalInformations;
