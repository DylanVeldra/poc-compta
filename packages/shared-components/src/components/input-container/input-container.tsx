import { ReactNode } from "react";

interface InputContainerProps {
  children: ReactNode;
  className?: string;
  noMargin?: boolean;
}

export default function InputContainer(props: InputContainerProps) {
  return (
    <div
      className={`grid ${props.className || "grid-cols-1"} ${
        props.noMargin ? "" : "mb-[40px]"
      }`}
    >
      <>{props.children}</>
    </div>
  );
}
