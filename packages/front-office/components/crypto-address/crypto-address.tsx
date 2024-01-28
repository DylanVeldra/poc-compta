import { Address } from "@shared-components/address";
import { AddressDto } from "@shared-types";
import { getTokenLogoUrl } from "@shared-utils";

interface CryptoAddressProps extends AddressDto {
  selected: boolean;
  onClick?: () => void;
  position: number;
  operationType: "withdrawal" | "deposit";
}
export default function CryptoAddress(props: CryptoAddressProps) {
  const logoUrl = getTokenLogoUrl(props.token);

  return (
    <div
      className={`bg-white dark:bg-dark-gray hover:bg-fade-white hover:dark:bg-fade-black ${
        props.position !== 0 && !props.selected
          ? "border-t-[1px] border-light-gray dark:border-gray"
          : ""
      } cursor-pointer`}
      onClick={props.onClick}
    >
      <div className="flex flex-row pr-[14px] pl-[6px] h-[50px]">
        <Address
          operationType={props.operationType}
          logoUrl={logoUrl}
          token={props.token}
          network={props.protocolName}
          fixedFee={props.fixedFee}
          percentFee={props.percentFee}
        />
        <div className="flex justify-end items-center ml-3">
          <div
            className={`border-2 rounded-full ${
              props.selected ? "border-gold" : "border-gray"
            } w-[18px] h-[18px] flex items-center justify-center`}
          >
            {props.selected ? (
              <div className="rounded-full bg-gold w-2 h-2"></div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
