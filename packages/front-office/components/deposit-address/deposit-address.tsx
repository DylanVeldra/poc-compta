import { useState } from "react";
import { CopyValueButton } from "@shared-components/copy-value-button";
import { useLanguageDictionary } from "@shared-hooks";
import { ContainerWithTitle } from "@shared-components/container-with-title";
import { formatNetwork, getTokenLogoUrl } from "@shared-utils";
import { Logo } from "@shared-components/logo";

import QRCode from "react-qr-code";

interface DepositAddressProps {
  token: string;
  protocolName: string;
  address: string;
}
export default function DepositAddress(props: DepositAddressProps) {
  const logoUrl = getTokenLogoUrl(props.token);
  const dict = useLanguageDictionary();
  const longNetworkName = formatNetwork(props.protocolName);
  const [showAddress, setShowAddress] = useState(true);

  const InputAddress = () => {
    return (
      <div className="flex flex-wrap justify-between items-center dark:bg-dark-gray h-auto md:h-10 rounded-md px-4 m-2 md:m-1">
        <div className="flex justify-between">
          <div className="mr-[14px] text-md flex items-center">
            <Logo width={16} height={16} src={logoUrl} />
            <p className="ml-[15px] text-gray md:text-white">
              {longNetworkName} ({props.protocolName})
            </p>
          </div>
        </div>
        <div className="flex flex-wrap break-normal w-full md:w-auto">
          <CopyValueButton
            value={props.address}
            customSize="text-md"
            justify="justify-between"
          />
        </div>
      </div>
    );
  };
  const QRCodeAddress = () => {
    return (
      <div className="flex justify-center bg-fake-white dark:bg-fake-black">
        <div className="rounded-md border-8 border-white">
          <QRCode value={props.address} size={120} />
        </div>
      </div>
    );
  };
  return (
    <ContainerWithTitle
      step={2}
      title={`${dict.deposit.copyAddress1} ${process.env.NEXT_PUBLIC_APP_NAME}${dict.deposit.copyAddress2}`}
      buttonText={
        showAddress ? dict.deposit.showQRCode : dict.deposit.showAddress
      }
      onClick={() => setShowAddress(!showAddress)}
      marginBottom
      noBorder={!showAddress}
      fontWeight={"font-light"}
    >
      <div className="">
        {showAddress ? <InputAddress /> : <QRCodeAddress />}
      </div>
    </ContainerWithTitle>
  );
}
