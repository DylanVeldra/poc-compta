import { Icon } from "@shared-components/icon";

interface InformationProps {
  text: string;
  icon?: string;
  className?: string;
}

export default function Information(props: InformationProps) {
  return (
    <div
      className={`flex flex-row md:h-10 space-x-4 items-center w-full text-white rounded-sm ${props.className} pr-10`}
    >
      {props.icon ? <Icon className="ml-4" src={"rs-info"} /> : ""}
      <div className={`${props.icon ? "ml-4" : ""} text-md m-2`}>
        {props.text}
      </div>
    </div>
  );
}
