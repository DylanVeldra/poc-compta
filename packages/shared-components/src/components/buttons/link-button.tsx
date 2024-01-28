import { Icon } from "../icon";

interface LinkButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  iconLeft?: string;
  iconRight?: string;
  turnWhite?: boolean;
  fontWeight?: string;
}

export default function LinkButton(props: LinkButtonProps) {
  return (
    <span
      className={`flex items-center ${
        props.disabled
          ? "text-light-gray dark:text-gray cursor-not-allowed"
          : `${
              props.turnWhite ? "text-white" : "text-gold"
            } cursor-pointer hover:underline`
      }`}
    >
      {props.iconLeft ? (
        <Icon
          src={props.iconLeft}
          className="rounded-sm flex items-center justify-center w-[34px] h-[34px] bg-white dark:bg-dark-gray mr-[28px]"
        />
      ) : (
        ""
      )}
      <span
        className={`${
          !props.disabled ? "hover:underline" : "pointer-events-none"
        } ${props.fontWeight ? props.fontWeight : "font-semibold"}`}
        onClick={props.onClick}
      >
        {props.label}
      </span>
      {props.iconRight ? (
        <Icon
          src={props.iconRight}
          className="ml-[28px] rounded-sm flex items-center justify-center w-[34px] h-[34px] bg-white dark:bg-dark-gray"
        />
      ) : (
        ""
      )}
    </span>
  );
}
