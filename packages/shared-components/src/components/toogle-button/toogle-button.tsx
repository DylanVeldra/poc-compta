type ToggleButtonProps = {
  label: string;
  onClick: (value: string) => void;
  selected: boolean;
};

export function ToggleButton(props: ToggleButtonProps) {
  return (
    <>
      <li
        className={`font-base flex items-center justify-center w-[38px] h-[38px] text-[13px] rounded-sm cursor-pointer ${
          props.selected ? 'bg-gold text-white dark:bg-gold' : ''
        }`}
        onClick={() => props.onClick(props.label)}
      >
        {props.label}
      </li>
    </>
  );
}
