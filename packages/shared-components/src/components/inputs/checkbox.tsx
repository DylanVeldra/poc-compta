import { ChangeEvent, useState, ReactNode, useRef } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface CheckboxProps <T extends FieldValues>{
  label?: string;
  readonly name: Path<T>;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<T>;
  isValueCorrect?: boolean;
  icon?: string | ReactNode;
  marginTop?: number;
  errorMessage?: string;
  updateForm: (name: keyof T, value: boolean) => void;
  toggleInputType?: (v: boolean) => void;
}

const Checkbox = <T extends FieldValues>(props: CheckboxProps<T>) => {
  const [checked, setChecked] = useState(props.checked);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    // props.onChange(!checked, e.target.value);
    props.updateForm(e.target.name, !checked);
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