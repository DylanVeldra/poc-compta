import { Icon } from "@shared-components/icon";
import { useState, useEffect, ReactNode } from "react";

interface QuestionProps {
  question: string;
  answer: string | ReactNode;
  onClick: (answer: string | ReactNode, question: string) => void;
  topBorderNone?: boolean;
  selectedQuestion: string;
  showQuestion: boolean;
  shownAnswer: string;
}

const Question = (props: QuestionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (props.selectedQuestion === props.question) {
      setIsOpen(true);
      return;
    }

    setIsOpen(false);
  }, [props.selectedQuestion]);

  return (
    <div className="">
      <div
        onClick={() => props.onClick(props.answer, props.question)}
        className={`flex py-10 h-auto w-full sm:w-full border-gold cursor-pointer items-center
    ${props.topBorderNone ? "" : "border-t-[1px]"} border-b-[1px]
    `}
      >
        <div className="flex flex-col w-full min-h-[30px]">
          <div className="flex justify-between w-full pr-5">
            <h3 className="text-lg text-fake-black dark:text-white">
              {props.question}
            </h3>
            <Icon
              src="rs-cross"
              className={`${
                !isOpen ? "rotate-45" : ""
              } transition-all duration-300	 text-gold text-lg ml-[20px]`}
            />
          </div>
          <div
            className={`${
              props.showQuestion ? "opacity-100 mt-[20px]" : "opacity-0 hidden"
            } transition transition-all ease-in w-full text-[15px]`}
          >
            {props.shownAnswer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
