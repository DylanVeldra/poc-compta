import { ChangeEvent, useState, ReactNode, useRef } from "react";

interface CheckboxProps {
  label?: string;
  name: string;
  disabled?: boolean;
  checked?: boolean;
  required?: boolean;
  isValueCorrect?: boolean;
  icon?: string | ReactNode;
  marginTop?: number;
  errorMessage?: string;
  updateForm: (name: string, value: boolean) => void;
  toggleInputType?: (v: boolean) => void;
  register: any;
  errors?: any;
}

const SignUpCheckbox = (props: CheckboxProps) => {
  const [checked, setChecked] = useState(props.checked);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.updateForm(e.target.name, !checked);
    setChecked(!checked);
  };

  return (
    <div className="relative z-0 w-full group mt-2">
      <label className={`block flex items-start font-base ${props.errors && props.errors[props.name] && "text-dark-red"}`}>
        <input
          {...props.register(props.name)}
          type="checkbox"
          name={props.name}
          checked={checked}
          onChange={onChange}
          disabled={props.disabled}
          required={props.required}
          className="w-[16px] accent-gold checked:text-white mr-2 mt-1 text-fake-black rounded-md"
        />
        {props.label}
      </label>

      {props.errors && props.errors[props.name] && (
        <span className="help-block text-dark-red text-left font-base text-sm ml-5">{props.errors[props.name].message}</span>
      )}
    </div>
  );
};

export default SignUpCheckbox;
