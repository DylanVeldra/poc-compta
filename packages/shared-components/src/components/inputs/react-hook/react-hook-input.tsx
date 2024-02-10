import { Icon } from "@shared-components/icon";
import { ReactNode, useRef } from "react";

import { ShowPassword } from "../../show-password";
import { FieldValues, Path, PathValue, UseFormRegister } from "react-hook-form";

interface InputProps <T extends FieldValues>{
  label?: string;
  readonly name: Path<T>;
  type?: string;
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
  onBlur?: () => void;
  toggleInputType?: (v: boolean) => void;
  updateForm: (key: Path<T>, value: unknown) => void;
  optionalLabel?: string;
  register: UseFormRegister<T>;
  errors: any;
}

export default function ReactHookInput<T extends FieldValues>(props: InputProps<T>) {
  const inputRef = useRef<HTMLInputElement | null>(null);

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
      className={`relative z-0 w-full group text-[15px] ${
        props.marginTop ? "mt-[" + props.marginTop + "px] sm:mt-0 md:mt-[" + props.marginTop + "px] lg:mt-0 " : ""
      }`}
    >
      <label className="block font-base text-fake-black dark:text-white relative">
        {props.optionalLabel ? optional() : props.label}
        <input
          {...props.register(props.name)}
          ref={inputRef}
          type={props.type || "text"}
          name={props.name}
          onBlur={props.onBlur}
          onChange={(e) => props.updateForm(props.name, e.target.value) }
          placeholder={props.placeholder || ""}
          required={props.required}
          minLength={props.minlength}
          maxLength={props.maxlength}
          className={` ${
            !props.errors[props.name]
              ? "border-2 border-white dark:border-dark-gray focus:border-2 focus:border-gold focus:dark:border-gold"
              : "border-2 border-dark-red dark:border-dark-red"
          } bg-white dark:bg-dark-gray text-fake-black dark:text-white h-[48px] rounded-sm 
          focus:outline-none  block w-full px-[20px] py-[16px] 
          focus:px-[20px] focus:py-[16px] placeholder-gray mt-1`}
        />
        {props.icon && <ShowPassword toggleInputType={toggleInputType} />}
        {props.errors[props.name] && props.errorIcon && (
          <span className="help-block text-dark-red text-left font-base text-sm absolute right-4 top-11">
            <Icon src="rs-cross" className="cursor-pointer text-dark-red" />
          </span>
        )}
      </label>
      {props.errors[props.name] && (
        <span className="help-block text-dark-red text-left font-base text-sm">{props.errors[props.name].message}</span>
      )}
    </div>
  );
}
