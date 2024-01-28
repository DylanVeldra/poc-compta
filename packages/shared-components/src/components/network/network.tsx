import { Logo } from "@shared-components/logo";

interface NetworkProps {
  logoUrl: string;
  name?: string;
  prefix?: string;
  width?: number;
  height?: number;
  padding?: boolean;
  inline?: boolean;
  token?: string;
}

export default function Network(props: NetworkProps) {
  return (
    <div className="flex items-center h-2">
      <div
        className={`${
          props.inline
            ? "flex flex-row w-full justify-end space-x-2 items-center"
            : ""
        }`}
      >
        <span className="text-md">{props.name}</span>
        <div className="mt-1">
          <Logo
            width={props.width ? props.width : 32}
            height={props.height ? props.height : 32}
            src={props.logoUrl}
          />
        </div>
        <span className="text-md">{props.token ? `${props.token} ` : ""}</span>
        <span className="text-sm text-gray">
          {props.inline ? `(${props.prefix})` : props.prefix}
        </span>
      </div>
    </div>
  );
}
