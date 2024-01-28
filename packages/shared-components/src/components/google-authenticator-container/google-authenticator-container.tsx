import { Icon } from "@shared-components/icon";
import { FormEvent } from "react";

interface ContainerProps {
  children: React.ReactNode;
  title?: string;
  inline?: boolean;
  value?: string;
  className?: string;
  marginBottom?: number;
  label: string;
}

export default function GoogleAuthenticatorContainer(props: ContainerProps) {
  return (
    <div
      className={
        props.inline ? "flex flex-col justify-center items-end h-[48px] w-[200px] mx-auto relative" : "" + ` ${props.className ?? ""}`
      }
      style={{ marginBottom: props.marginBottom ? props.marginBottom + "px" : "" }}
    >
      {props.children}
      <div className="right-0 -bottom-8 text-sm text-gold cursor-pointer text-light">{props.label}</div>
    </div>
  );
}
