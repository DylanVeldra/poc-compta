import { useState } from "react";
import { CryptoAddress } from "components/crypto-address";
import { AddressDto } from "@shared-types";
import { motion } from "framer-motion";

interface CryptoAddressListProps {
  data: AddressDto[];
  onSelected?: (network: AddressDto) => void;
  operationType: "withdrawal" | "deposit";
}
export default function CryptoAddressList(props: CryptoAddressListProps) {
  const [selected, setSelected] = useState(0);

  const onSelected = (network: AddressDto) => {
    if (network.id === undefined) {
      setSelected(undefined);
      return;
    }
    setSelected(network.id);
    props.onSelected(network);
  };

  return (
    <>
      {props.data.map((address, index) => {
        return (
          <CryptoAddress
            operationType={props.operationType}
            {...address}
            selected={address.id === selected}
            onClick={() => onSelected(address)}
            key={index}
            position={index}
          />
        );
      })}
    </>
  );
}
