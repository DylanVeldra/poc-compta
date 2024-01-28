import { Icon } from "@shared-components/icon";
import { useState } from "react";

interface ButtonProps {
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "primary" | "secondary" | "icon";
  size?: "lg" | "md";
  buttonWidth?: number;
  addClassName?: string;
  marginTop?: number;
  icon?: string;
  iconCustomClass?: string;
  textSize?: "sm" | "md" | "lg" | "[16px]"; // @TODO --> [16px] is a temporary change and should not remain, remove it as soon as a 16px text-size value is available in the tailwind.config file
}

export default function Button(props: ButtonProps) {
  const [width, setWidth] = useState(props.buttonWidth + "px");
  const size = props.size === "md" ? "text-md h-[36px]" : "h-[48px]";
  const styles = {
    primary: 'text-white dark:text-fake-black bg-gold disabled:bg-light-gray dark:disabled:bg-gray hover:opacity-80',
    secondary: 'text-gold border-2 border-gold disabled:border-light-gray dark:disabled:border-gray disabled:text-light-gray dark:disabled:text-gray hover:opacity-80',
    icon: 'text-black dark:text-white bg-white dark:bg-dark-gray flex justify-center items-center hover:dark:bg-dark-gray-dimmed cursor-pointer rounded-sm pr-0 pl-2 disabled:bg-light-gray dark:disabled:bg-gray'
  }
  const style = styles[props.type ?? 'primary'];

  return (
    <button
      className={`${style} ${size} w-full flex items-center justify-center font-semibold focus:outline-none focus:ring-gold rounded-sm px-5 text-center cursor-pointer disabled:cursor-not-allowed ${props.addClassName}`}
      onClick={props.onClick}
      disabled={props.disabled}
      style={{
        marginTop: props.marginTop ? props.marginTop + "px" : "",
        width,
      }}
      type={!props.onClick ? "submit" : "button"}
    >
      <div className="w-full flex flex-row items-center space-x-2 justify-center">
        {props.icon && (
          <span>
            <Icon src={props.icon} className={`${props.iconCustomClass ? props.iconCustomClass : "`text-[10px]"}`} />
          </span>
        )}
        <span className={`text-${props.textSize ? props.textSize : "md"}`}>{props.label}</span>
      </div>
    </button>
  );
}
