import DropList from "./drop-list";
import { useLanguageDictionary } from "@shared-hooks";

interface TokenListProps {
  updateForm: (v: string, x: string) => void;
  onChange?: (v: string, x: string) => void;
  currentValue?: string;
  disabled?: boolean;
  marginTop?: number;
  errors?: any;
  secondaryView?: boolean;
  customBackground?: string;
}
export default function TokenList(props: TokenListProps) {
  const dict = useLanguageDictionary();
  const tokens = [
    {
      value: "USDT",
    },
    {
      value: "USDC",
    },
    {
      value: "BUSD",
    },
  ];

  const onTokenChange = (v: string) => {
    if (!v) return;

    if (props.updateForm) {
      props.updateForm("token", v);
    }
  };

  return (
    <DropList
      list={tokens}
      defaultValue="USDT"
      name="token"
      secondaryView={props.secondaryView ? props.secondaryView : false}
      secondPlaceholder={dict.address.choose}
      onChange={onTokenChange}
      currentValue={props.currentValue}
      disabled={props.disabled}
      marginTop={props.marginTop}
      placeholder={dict.address.token}
      customBackground={props.customBackground}
      customSize="h-[40px] border-[1px] border-light-gray dark:border-gray"
    />
  );
}
