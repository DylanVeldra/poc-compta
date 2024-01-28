import { ChangeEvent, useState, ReactNode, useRef } from "react";

interface CheckboxProps {
  label?: string;
  name: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  isValueCorrect?: boolean;
  icon?: string | ReactNode;
  marginTop?: number;
  errorMessage?: string;
  onChange: (checked: boolean, value: string) => void;
  updateForm?: (v: string | number) => void;
  toggleInputType?: (v: boolean) => void;
}

const Checkbox = (props: CheckboxProps) => {
  const [checked, setChecked] = useState(props.checked);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange(!checked, e.target.value);
    setChecked(!checked);
  };

  return (
    <div className="mt-2 w-max">
      <label className={`block flex items-start font-base ${props.errorMessage && "text-dark-red"}`}>
        <input
          type="checkbox"
          name={props.name}
          value={props.name}
          checked={checked}
          onChange={onChange}
          disabled={props.disabled}
          required={props.required}
          className="accent-gold checked:text-white mr-2 mt-1 text-fake-black rounded-md"
        />
        {props.label}
      </label>
      {props.errorMessage && (
        <span className="ml-5 help-block text-dark-red text-left font-base text-sm">
          {props.errorMessage}
        </span>
      )}
    </div>
  );
};

export default Checkbox;