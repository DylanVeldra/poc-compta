import { ChangeEvent, ReactNode, useState } from 'react';

interface SingleLineInputProps {
  label?: string | ReactNode;
  name: string;
  type?: string;
  value?: string;
  numberValue?: number;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  minlength?: number;
  maxlength?: number;
  min?: number;
  max?: number;
  isValueCorrect?: boolean;
  onChange?: (v: string) => void;
  updateForm?: (v: ChangeEvent<any>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  icon?: ReactNode | string;
  customIconPadding?: string;
  rounded?:
    | 'rounded-t-md'
    | 'rounded-b-md'
    | 'rounded-md'
    | 'rounded-none'
    | 'rounded-sm';
  noBorderTop?: boolean;
  noBorderBottom?: boolean;
  multiline?: boolean;
  inputTextSize?: string;
  borders?: boolean;
  errorMessage?: string | ReactNode;
  errorIcon?: boolean;
  showAlwaysIcon?: boolean;
  marginLabel?: string;
}

export default function SingleLineInput(props: SingleLineInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const textSize =
    props.value?.length && props.value.length < 30 ? 'text-md' : 'text-sm';
  const rounded = props.rounded || 'rounded-md';

  const onFocus = () => {
    setIsFocused(true);
    props.onFocus?.();
  };
  const onBlur = () => {
    setIsFocused(false);
    props.onBlur?.();
  };
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;

    e.target.rows = 1;
    e.target.rows = Math.round(e.target.scrollHeight / 20 - 1);
    props.updateForm?.(e);
    props.onChange?.(v);
  };

  const hoverClasses = 'hover:bg-fade-white hover:dark:bg-fade-black';

  return (
    <div>
      <div
        className={`${
          props.disabled ? '' : hoverClasses
        } bg-white dark:bg-dark-gray relative group text-sm
      border-[1px] border-light-gray dark:border-gray ${rounded}
      ${
        isFocused
          ? 'border-gold dark:border-gold border-[2px]'
          : `${props.noBorderTop ? 'border-t-[0px]' : ''}
             ${props.noBorderBottom ? 'border-b-[0px]' : ''}
             ${
               props.borders &&
               props.errorMessage &&
               'border-[2px] border-dark-red dark:border-dark-red'
             }`
      }`}
      >
        <label
          className={`flex flex-col sm:flex-row py-2 h-[54px] md:h-auto md:py-0 items-start sm:items-center sm:justify-between
        text-fake-black dark:text-white text-sm ${
          isFocused ? 'min-h-[38px]' : 'min-h-[40px]'
        }`}
        >
          <div className="px-[15px] self-start pt-[10px] hidden md:block">
            <>{props.label}</>
          </div>
          <div
            className={`flex px-[15px] absolute text-gray md:hidden transition-all ease-in duration-150 ${
              isFocused || props.value || props.numberValue
                ? 'top-2'
                : 'top-1/2 -translate-y-1/2'
            }`}
          >
            <span className={props.marginLabel}>
              <>{props.label}</>
            </span>
          </div>
          {props.multiline ? (
            <textarea
              name={props.name}
              value={props.value}
              placeholder={props.placeholder || ''}
              onChange={onChange}
              disabled={props.disabled}
              required={props.required}
              minLength={props.minlength}
              maxLength={props.maxlength}
              onFocus={onFocus}
              onBlur={onBlur}
              autoComplete="off"
              rows={1}
              className={`${textSize} rounded-md px-[15px] py-[8px] bg-transparent text-right text-fake-black dark:text-white placeholder-gray focus:outline-none grow resize-none`}
            ></textarea>
          ) : (
            <input
              type={props.type || 'text'}
              name={props.name}
              value={props.value || props.numberValue}
              defaultValue={props.defaultValue}
              placeholder={props.placeholder || ''}
              onChange={(e) => {
                props.onChange?.(e.target.value);
                props.updateForm?.(e);
              }}
              disabled={props.disabled}
              required={props.required}
              minLength={props.minlength}
              maxLength={props.maxlength}
              min={props.min}
              max={props.max}
              onFocus={onFocus}
              onBlur={onBlur}
              autoComplete="off"
              className={`${
                props.inputTextSize && props.inputTextSize
              } rounded-md pr-[15px] ml-4
            ${
              props.icon
                ? props.customIconPadding
                  ? props.customIconPadding
                  : 'pr-[24px] focus:pr-[34px]'
                : 'focus:pr-md'
            }
             w-full md:w-auto bg-transparent md:text-right
            text-fake-black dark:text-white placeholder-gray focus:outline-none grow mobile-placeholder-hidden
            absolute  md:relative
            ${
              isFocused || props.value || props.numberValue
                ? 'bottom-2 md:bottom-0'
                : ''
            }
            `}
            />
          )}
          {isFocused ||
          props.value ||
          props.numberValue ||
          props.showAlwaysIcon ? (
            <div className="absolute right-[15px] text-md">
              <>{props.icon}</>
            </div>
          ) : (
            <></>
          )}
        </label>
      </div>
      {props.errorMessage && (
        <span className="help-block text-dark-red text-left font-base text-sm bg-transparent">
          <>{props.errorMessage}</>
        </span>
      )}
    </div>
  );
}
