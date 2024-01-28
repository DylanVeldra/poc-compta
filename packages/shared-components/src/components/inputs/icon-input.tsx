import { ChangeEvent, ReactNode } from "react";

interface IconInputProps {
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
  icon: ReactNode;
  marginTop?: number;
  errorMessage?: string;
  errorIcon?: boolean;
  onChange: (v: string | number) => void;
  onBlur?: () => void;
  toggleInputType?: (v: boolean) => void;
  updateForm?: (v: string | number) => void;
  optionalLabel?: string;
}

export default function IconInput(props: IconInputProps) {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(e.target.value);
  };

  return (
    <div
      className={`relative z-0 w-full group text-md ${
        props.marginTop
          ? "mt-[" +
            props.marginTop +
            "px] sm:mt-0 md:mt-[" +
            props.marginTop +
            "px] lg:mt-0 "
          : ""
      }`}
    >
      <label className="relative block font-base text-fake-black dark:text-white">
        {props.label}
        <div className="absolute top-1/2 -translate-y-1/2 left-3">
          <>{props.icon}</>
        </div>
        <input
          type={props.type || "text"}
          name={props.name}
          value={props.value}
          placeholder={props.placeholder || ""}
          onChange={(props.updateForm || onChange) as any}
          onBlur={props.onBlur && props.onBlur}
          disabled={props.disabled}
          required={props.required}
          minLength={props.minlength}
          maxLength={props.maxlength}
          className={` ${
            !props.errorMessage
              ? ""
              : "border-2 border-dark-red dark:border-dark-red"
          } bg-white dark:bg-dark-gray text-fake-black dark:text-white h-[48px] border-light-gray dark:border-gray border-[1px] rounded-sm focus:outline-none focus:border-gold focus:dark:border-gold focus:border-2 block w-full focus:px-[38px] px-[40px] py-[16px] focus:py-[14px] placeholder-gray`}
        />
        {props.errorIcon && (
          <span className="help-block text-dark-red text-left font-base text-sm absolute right-4 top-11">
            <img src="/images/redDelete.svg" />
          </span>
        )}
      </label>
      {props.errorMessage && (
        <span className="help-block text-dark-red text-left font-base text-sm">
          {props.errorMessage}
        </span>
      )}
    </div>
  );
}
