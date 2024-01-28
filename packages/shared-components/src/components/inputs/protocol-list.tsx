import DropList from "./drop-list";
import { useLanguageDictionary } from "@shared-hooks";

interface ProtocolListProps {
  updateForm?: (v: string, x: string) => void;
  onChange?: (v: string, x: string) => void;
  currentValue?: string;
  disabled?: boolean;
  marginTop?: number;
  errors?: any;
  secondaryView?: boolean;
  customBackground?: string;
}
export const ProtocolList = (props: ProtocolListProps) => {
  const dict = useLanguageDictionary();
  const protocols = [
    {
      label: "Etherum (ERC20)",
      value: "ERC20",
    },
    {
      label: "Binance Smart Chain (BEP20)",
      value: "BEP20",
    },
  ];

  const onProtocolChange = (v: string) => {
    if (!v) return;

    if (props.updateForm) {
      props.updateForm("protocolName", v);
    }
  };

  return (
    <DropList
      list={protocols}
      defaultValue="ERC20"
      name="protocolName"
      secondPlaceholder={dict.address.choose}
      secondaryView={props.secondaryView ? props.secondaryView : false}
      onChange={onProtocolChange}
      currentValue={props.currentValue}
      disabled={props.disabled}
      marginTop={props.marginTop}
      placeholder={dict.address.protocolName}
      errors={props.errors}
      customBackground={props.customBackground}
      customSize="h-[40px] border-[1px] border-light-gray dark:border-gray"
    />
  );
};
