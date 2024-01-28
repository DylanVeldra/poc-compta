import { ReactNode } from "react";
import { Chip } from "../chip";

interface StepContainerProps {
  step: number;
  title: string;
  inline?: boolean;
  children?: ReactNode;
}

export default function StepContainer(props: StepContainerProps) {
  return (
    <div
      className={`bg-white dark:bg-dark-gray p-5 rounded-sm mb-5 ${
        props.inline ? "flex flex-col lg:flex-row" : ""
      } justify-between`}
    >
      <div className="flex items-center">
        <Chip step={props.step} />
        <div className="flex justify-center items-center text-md">
          {props.title}
        </div>
      </div>
      <div
        className={props.inline ? "flex mt-8 lg:mt-0 justify-center" : "mt-8"}
      >
        <>{props.children}</>
      </div>
    </div>
  );
}
