import { Tooltip } from '@shared-components/tooltip';
import { useLanguageDictionary } from '@shared-hooks';
import { MouseEventHandler, useState } from 'react';
import { writeIntoClipboard } from '@shared-utils';
import { Icon } from '../icon';

interface CopyValueButtonProps {
  value: string;
  realValue?: string;
  hideValue?: boolean;
  customSize?: string;
  customTextSize?: string;
  hideIcon?: boolean;
  justify?: string;
}
export default function CopyValueButton(props: CopyValueButtonProps) {
  const textSize = (props.value?.length || 0) < 30 ? 'text-md' : 'text-sm';
  const [isCopied, setIsCopied] = useState(false);
  const dict = useLanguageDictionary();

  const onClick = () => {
    writeIntoClipboard(props.realValue ?? props.value).then(() =>
      setIsCopied(true),
    );
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      className={`relative flex flex-row text-sm md:text-md flex-wrap items-center ${props.justify} w-full `}
    >
      <div
        className={`${props.hideIcon ? '' : 'mr-[15px]'} ${
          props.customTextSize ? props.customTextSize : textSize
        } break-normal`}
      >
        {!props.hideValue ? props.value : ''}
      </div>
      {props.hideIcon ? (
        ''
      ) : (
        <Tooltip label={isCopied ? dict.copied : dict.clickToCopy}>
          <div
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="w-[16px] h-[16px] cursor-pointer flex items-center justify-center"
          >
            <Icon
              src={isCopied ? 'rs-check' : 'rs-copy'}
              className={`${
                props.customSize ? props.customSize : 'text-[10px]'
              } flex items-center justify-center`}
            />
          </div>
        </Tooltip>
      )}
    </div>
  );
}
