import { Tooltip } from "@shared-components/tooltip";
import { useLanguageDictionary } from "@shared-hooks";
import { writeIntoClipboard } from '@shared-utils';
import { useState } from "react";
import { Icon } from "../icon";

interface CopyValueInputProps {
  value: string;
  hideValue?: boolean;
  customSize?: string;
}
export default function CopyValueInput(props: CopyValueInputProps) {
  const textSize = (props.value?.length || 0) < 30 ? "text-md" : "text-sm";
  const [isCopied, setIsCopied] = useState(false);
  const dict = useLanguageDictionary();

  const onClick = () => {
    writeIntoClipboard(props.value).then(() => setIsCopied(true));
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative flex items-center justify-start w-full">
      <p className={`mr-[15px] ${textSize} overflow-x-auto`}>{!props.hideValue ? props.value : ""}</p>
      <Tooltip label={isCopied ? dict.copied : dict.clickToCopy}>
        <div onClick={onClick} className="w-[16px] h-[16px] cursor-pointer flex items-center justify-center">
          <Icon
            src={isCopied ? "rs-check" : "rs-copy"}
            className={`${props.customSize ? props.customSize : "text-[10px]"} flex items-center justify-center`}
          />
        </div>
      </Tooltip>
    </div>
  );
}
