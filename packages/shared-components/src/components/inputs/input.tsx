import { Icon } from "@shared-components/icon";
import { ChangeEvent, ReactNode, useRef } from "react";

import { ShowPassword } from "../show-password";

interface InputProps {
  label?: string;
  name: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  minlength?: number;
  maxlength?: number;
  isValueCorrect?: boolean;
  icon?: string | ReactNode;
  marginTop?: number;
  errorMessage?: string;
  errorIcon?: boolean;
  id?: string;
  onChange: (v: string) => void;
  updateForm?: (v: React.ChangeEvent<any>) => void;
  onBlur?: () => void;
  toggleInputType?: (v: boolean) => void;
  optionalLabel?: string;
  size?: string;
}

export default function Input(props: InputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.updateForm) {
      props.updateForm(e);
    } else {
      props.onChange?.(e.target.value);
    }
  };

  const toggleInputType = (show: boolean) => {
    const input = inputRef.current;
    if (input && show) {
      input.type = "text";
    } else if (input && !show) {
      input.type = "password";
    }
  };

  const optional = () => (
    <p>
      {props.label} <small>{props.optionalLabel}</small>
    </p>
  );

  return (
    <div
      className={`relative z-0 w-full group text-md ${
        props.marginTop ? "mt-[" + props.marginTop + "px] sm:mt-0 md:mt-[" + props.marginTop + "px] lg:mt-0 " : ""
      }`}
      id={props.id && props.id}
    >
      <label className="block font-base text-fake-black dark:text-white relative">
        {props.optionalLabel ? optional() : props.label}
        <input
          ref={inputRef}
          type={props.type || "text"}
          name={props.name}
          value={props.value}
          placeholder={props.placeholder || ""}
          onChange={onChange}
          onBlur={props.onBlur && props.onBlur}
          disabled={props.disabled}
          required={props.required}
          minLength={props.minlength}
          maxLength={props.maxlength}
          autoComplete="off"
          className={`${
            !props.errorMessage 
              ? "border-2 border-white dark:border-dark-gray" 
              : "border-2 border-dark-red dark:border-dark-red"
          } bg-white dark:bg-dark-gray text-fake-black dark:text-white ${props.size ? props.size : "h-[48px]"} 
          rounded-sm focus:outline-none focus:border-gold focus:border-2 
          block w-full px-[20px] py-[16px] focus:px-[20px] focus:py-[14px] placeholder-gray mt-1`}
        />
        {props.icon && <ShowPassword toggleInputType={toggleInputType} />}
        {props.errorIcon && (
          <span className="help-block text-dark-red text-left font-base text-sm absolute right-4 top-11">
            <Icon src="rs-cross" className="cursor-pointer text-dark-red" />
          </span>
        )}
      </label>
      {props.errorMessage && <span className="help-block text-dark-red text-left font-base text-sm">{props.errorMessage}</span>}
    </div>
  );
}
