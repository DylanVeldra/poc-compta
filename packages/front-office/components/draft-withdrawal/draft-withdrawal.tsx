import { GradientBorder } from "@shared-components/gradient-border";
import {
  AddressDto,
  WithdrawalDto,
  WithdrawalInformationsData,
} from "@shared-types";
import { useLanguageDictionary } from "@shared-hooks";
import { MutableRefObject, useEffect, useState } from "react";
import { WithdrawalOperationSection } from "components/withdrawal-operation-section";
import WithdrawalInformations from "components/withdrawal-informations/withdrawal-informations";
import { AnyQuestion } from "components/any-question";
import { WithdrawalAmountSummary } from "components/amount-summary";
import DraftWithdrawalHeader from "./draft-withdrawal-header";
import { Button } from "@shared-components/buttons";

interface DraftWithdrawalProps {
  setAddress: (address: AddressDto) => void;
  setWithdrawal: (withdrawal: WithdrawalDto) => void;
  setDeleteWithdrawalModalOpen: (open: boolean) => void;
  handleSubmit: (arg: any) => any;
  onUpdateHandler: (v: string) => void;
  updateAddressObject?: (
    name: "emitterAddress" | "netRequestedAmount",
    value: string | number
  ) => void;
  withdrawal: WithdrawalDto;
  addresses: AddressDto[];
  address: AddressDto;
  withdrawalInformationsRef: MutableRefObject<WithdrawalInformationsData>;
  errors?: {
    emitterAddress?: {
      message?: string;
    };
    netRequestedAmount?: {
      message?: string;
    };
  };
}
export default function DraftWithdrawal(props: DraftWithdrawalProps) {
  const dict = useLanguageDictionary();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    props.updateAddressObject(
      "emitterAddress",
      props.withdrawal.emitterAddress
    );
    props.updateAddressObject(
      "netRequestedAmount",
      props.withdrawal.netRequestedAmount
    );
  }, []);

  const validateInput = () => {
    return (
      !props.withdrawal?.netRequestedAmount ||
      !props.withdrawal?.emitterAddress ||
      Object.keys(props.errors).length > 0
    );
  };

  const Aside = () => {
    return (
      <>
        <div className="hidden md:flex">
          <AnyQuestion text={dict.withdrawal.readTheGuide} />
        </div>
        {props.address && (
          <WithdrawalAmountSummary
            fixedFeeLabel={dict.withdrawal.fixedFee}
            validationLabel={dict.withdrawal.netAmountAsked}
            netAmountLabel={dict.withdrawal.netAmountAsked}
            percentFeeLabel={dict.deposit.percentFee}
            amountLabel={dict.withdrawal.netAmountAsked}
            fixedFee={props.address.fixedFee}
            percentFee={props.address.percentFee}
            usdAmount={props.withdrawal.netRequestedAmount / 100 ?? 0}
            finalAmount={props.withdrawal.rawDebitedAmount / 100 ?? 0}
            disableButton={validateInput()}
          >
            <div className="flex flex-row space-x-1">
              <Button
                label={dict.withdrawal.cancel}
                type="secondary"
                onClick={() => props.setDeleteWithdrawalModalOpen(true)}
                size={"md"}
                textSize={"sm"}
              />
              {
                <Button
                  label={dict.withdrawal.update}
                  onClick={() => props.handleSubmit(props.onUpdateHandler)}
                  disabled={validateInput()}
                  size={"md"}
                  textSize={"sm"}
                />
              }
            </div>
          </WithdrawalAmountSummary>
        )}
      </>
    );
  };

  return (
    <div className="my-10 max-w-[900px] mx-auto">
      <GradientBorder>
        <WithdrawalOperationSection
          aside={<Aside />}
          header={
            <DraftWithdrawalHeader
              withdrawal={props.withdrawal}
              isOpen={isOpen}
            />
          }
          subtitle={dict.withdrawal.network}
          addresses={props.addresses}
          address={props.address}
          onAddressChange={props.setAddress}
          marginBottom={!!props.address}
          collapsable
          onCollapse={setIsOpen}
        >
          <WithdrawalInformations
            errors={props.errors}
            onChange={props.setWithdrawal}
            withdrawal={props.withdrawal}
            ref={props.withdrawalInformationsRef}
            updateAddressObject={props.updateAddressObject}
            address={props.address}
          />
        </WithdrawalOperationSection>
      </GradientBorder>
    </div>
  );
}
