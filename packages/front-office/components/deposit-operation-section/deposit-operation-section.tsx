import { ContainerWithTitle } from "@shared-components/container-with-title";
import { SubWindow } from "@shared-components/sub-window";
import { CryptoAddress } from "components/crypto-address";
import { CryptoAddressList } from "components/crypto-address-list";
import { useLanguageDictionary } from "@shared-hooks";
import { ReactNode } from "react";
import { AddressDto } from "@shared-types";
import { AnyQuestion } from "components/any-question";
import { motion, AnimatePresence } from "framer-motion";

interface DepositOperationSectionProps {
  onAddressChange: (address: AddressDto) => void;
  onCollapse?: (collapse: boolean) => void;
  aside: ReactNode;
  subtitle: string;
  children: ReactNode;
  addresses: AddressDto[];
  address?: AddressDto;
  header: ReactNode;
  showNetworkWallet?: boolean;
  marginBottom?: boolean;
  collapsable?: boolean;
}

export default function DepositOperationSection(
  props: DepositOperationSectionProps
) {
  const dict = useLanguageDictionary();

  return (
    <div className="my-10 w-full md:w-[900px]">
      <SubWindow
        header={props.header}
        collapsable={props.collapsable}
        onCollapse={props.onCollapse}
      >
        <div className="flex justify-between flex-wrap">
          <>
            <div className="w-full md:w-[530px]">
              <>
                <div className="flex md:hidden mb-6">
                  <AnyQuestion text={dict.deposit.readTheGuide} />
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
                        operationType={"deposit"}
                        selected={true}
                        position={0}
                        onClick={() => props.onAddressChange(undefined)}
                      />
                    ) : (
                      <motion.div
                        key={props.address ? "close" : "open"}
                        className=""
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
                          operationType={"deposit"}
                          data={props.addresses}
                          onSelected={props.onAddressChange}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </ContainerWithTitle>
                <>{props.address ? props.children : ""}</>
              </>
            </div>
          </>
          <div className="w-full md:w-[257px] flex flex-col items-end justify-between">
            <>{props.aside}</>
          </div>
        </div>
      </SubWindow>
    </div>
  );
}
