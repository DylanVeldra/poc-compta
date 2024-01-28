import { ReactNode } from "react";

interface TitleProps {
  title: ReactNode | string;
  subtitle?: ReactNode | string;
  class?: string;
  size?: string;
  subtitleClass?: string;
  action?: ReactNode;
}

export default function Title(props: TitleProps) {
  return (
    <>
      <div className="flex flex-row justify-between items-start md:items-center w-full">
        <div className="w-full">
          <h2
            className={`text-left text-xl md:text-3xl font-semibold ${
              props.class ? props.class : ""
            }`}
          >
            <>{props.title}</>
          </h2>
          <div
            className={`text-sm font-normal mt-5 ${
              props.subtitleClass && props.subtitleClass
            }`}
          >
            <>{props.subtitle}</>
          </div>
        </div>
        <div>
          <>{props.action}</>
        </div>
      </div>
    </>
  );
}
