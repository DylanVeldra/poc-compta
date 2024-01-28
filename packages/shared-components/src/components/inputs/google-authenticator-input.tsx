import { Icon } from "@shared-components/icon";
import { RoundLoader } from "@shared-components/loaders";
import { ChangeEvent, useState, ReactNode, useRef, useEffect } from "react";

interface InputProps {
  label?: string;
  name: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  isValid?: boolean;
  required?: boolean;
  minlength?: number;
  maxlength?: number;
  icon?: string | ReactNode;
  marginTop?: number;
  isCodeComplete?: boolean;
  isSubmitting: boolean;
  onChange: (v: string) => void;
  toggleInputType?: (v: boolean) => void;
  onSubmit?: (e: string) => void;
}

export default function GoogleAuthenticatorInput(props: InputProps) {
  const [value, setValue] = useState(props.value || "");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (value.length === 6) {
      props.onSubmit?.(value);
    }
  }, [value]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 6) return;
    setValue(e.target.value);
    props.onChange(e.target.value);
  };

  return (
    <div className="relative z-0 w-full group mt-[31px] w-[200px] mx-auto">
      <label className="block font-base text-fake-black dark:text-white relative text-xl relative">
        <input
          ref={inputRef}
          type={props.type || "text"}
          name={props.name}
          value={value || props.value}
          placeholder={props.placeholder || ""}
          onChange={onChange}
          disabled={props.isValid}
          required={props.required}
          minLength={props.minlength}
          maxLength={props.maxlength}
          className={` border-2 
            ${!value.length && "border-dark-gray"}
            ${value.length && "border-gold"}
            ${value.length === 6 && !props.isValid && !props.isSubmitting && "border-red"}
            ${value.length === 6 && props.isValid && !props.isSubmitting && "border-green"}
            text-left tracking-wider dark:text-white
            bg-white dark:bg-fake-black text-fake-black h-[48px] rounded-md focus:outline-none 
            focus:border-2 block w-full px-[18px] py-[16px] focus:px-[18px] focus:py-[14px] placeholder-gray`}
        />
        {props.isSubmitting && <RoundLoader width={5} height={5} color="gold" customClass="absolute top-3.5 right-4" />}
        {value.length === 6 && !props.isSubmitting && !props.isValid && (
          <Icon src="rs-cross" className="text-md text-red absolute top-4 right-4" />
        )}
        {value.length === 6 && !props.isSubmitting && props.isValid && (
          <Icon src="rs-check" className="text-md text-green absolute top-3.5 right-4" />
        )}
      </label>
    </div>
  );
}
