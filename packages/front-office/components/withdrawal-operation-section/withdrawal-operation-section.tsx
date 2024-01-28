import { ReactNode } from "react";
import { useLanguageDictionary } from "@shared-hooks";
import { AddressDto } from "@shared-types";
import { SubWindow } from "@shared-components/sub-window";
import { ContainerWithTitle } from "@shared-components/container-with-title";
import { CryptoAddress } from "components/crypto-address";
import { CryptoAddressList } from "components/crypto-address-list";
import { AnyQuestion } from "components/any-question";
import { motion, AnimatePresence } from "framer-motion";

interface WithdrawalOperationSectionProps {
  onAddressChange: (address: AddressDto) => void;
  onCollapse?: (collapse: boolean) => void;
  aside: ReactNode;
  subtitle: string;
  children: ReactNode;
  addresses: AddressDto[];
  address?: AddressDto;
  header?: ReactNode;
  showNetworkWallet?: boolean;
  marginBottom?: boolean;
  collapsable?: boolean;
}
export default function WithdrawalOperationSection(
  props: WithdrawalOperationSectionProps
) {
  const dict = useLanguageDictionary();
  return (
    <div
      className={`max-w-[900px] mx-auto ${
        props.collapsable ? "my-0" : "my-10"
      }`}
    >
      <SubWindow
        header={props.header}
        collapsable={props.collapsable}
        onCollapse={props.onCollapse}
      >
        <div className="flex justify-between flex-wrap">
          <div className="w-full md:w-[530px]">
            <>
              <div className="flex md:hidden mb-6">
                <AnyQuestion text={dict.withdrawal.readTheGuide} />
              </div>
              <ContainerWithTitle
                step={1}
                title={props.subtitle}
                buttonText={props.address !== undefined ? dict.change : ""}
                onClick={() => props.onAddressChange(undefined)}
                marginBottom={props.marginBottom}
                fontWeight={"font-light"}
              >
                <AnimatePresence initial={false} mode="sync">
                  {props.address ? (
                    <CryptoAddress
                      {...props.address}
                      operationType={"withdrawal"}
                      selected={true}
                      position={0}
                      onClick={() => props.onAddressChange(undefined)}
                    />
                  ) : (
                    <motion.div
                      key={props.address ? "close" : "open"}
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                    >
                      <CryptoAddressList
                        operationType={"withdrawal"}
                        data={props.addresses}
                        onSelected={props.onAddressChange}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </ContainerWithTitle>
              {props.address ? props.children : ""}
            </>
          </div>
          <div className="w-full md:w-[257px] flex flex-col items-end justify-between">
            <>{props.aside}</>
          </div>
        </div>
      </SubWindow>
    </div>
  );
}
