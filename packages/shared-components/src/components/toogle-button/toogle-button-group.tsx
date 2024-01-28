import { useState } from 'react';
import { ToggleButton } from './toogle-button';

type ToggleButtonGroupProps = {
  options: string[];
  onChange: (value: string) => void;
};

export function ToggleButtonGroup(props: ToggleButtonGroupProps) {
  const [selected, setSelected] = useState(props.options[0]);

  const handleClick = (value: string) => {
    setSelected(value);
    props.onChange(value);
  };

  const isSelected = (value: string) => {
    return value === selected;
  };

  return (
    <ul className="w-min flex items-center justify-center bg-white dark:bg-dark-gray rounded-[4px] border border-light-gray dark:border-gray">
      {props.options.map((option) => (
        <ToggleButton
          key={option}
          selected={isSelected(option)}
          onClick={handleClick}
          label={option}
        />
      ))}
    </ul>
  );
}
