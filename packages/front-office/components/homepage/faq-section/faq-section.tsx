import { Question } from "components/homepage";
import { useLanguageDictionary } from "@shared-hooks";
import { useState } from "react";

interface FaqSectionProps {
  title: string;
}

const FaqSection = (props: FaqSectionProps) => {
  const dict = useLanguageDictionary();
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [shownAnswer, setShownAnswer] = useState("");

  const thirdQuestionAnswer = () => (
    <div className="flex flex-col">
      <p>{dict.homepage.thirdQuestionAnswer.firstPart}</p>
      <p className="mt-2">
        {process.env.NEXT_PUBLIC_APP_NAME}{" "}
        {dict.homepage.thirdQuestionAnswer.secondPart}
      </p>
      <ul className="list-disc ml-[30px]">
        {dict.homepage.thirdQuestionAnswer.cryptoList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <p className="mt-2">{dict.homepage.thirdQuestionAnswer.thirdPart}</p>
      <ul className="list-disc ml-[30px]">
        {dict.homepage.thirdQuestionAnswer.networkList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );

  const updateShownQuestion = (answer: string, question: string) => {
    if (selectedQuestion === question) {
      setSelectedQuestion("");
      setShownAnswer("");
      setShowQuestion(false);
      return;
    }

    setSelectedQuestion(question);
    setShownAnswer(answer);
    setShowQuestion(true);
  };

  return (
    <div className="flex flex-col text-fake-black dark:text-white mb-[70px] sm:mb-[100px]">
      <h1 className="text-center text-[36px] sm:text-[46px] leding-[30px] sm:leading-[60px] font-semibold">
        {props.title}
      </h1>
      <div className="max-w-[1058px] w-full mx-auto flex flex-col md:flex-row md:space-x-10 mt-[50px] sm:mt-[100px] h-auto">
        <div className="flex flex-col w-full md:w-1/2 md:gap-x-[100px]">
          <Question
            question={`${dict.homepage.firstQuestion1} ${process.env.NEXT_PUBLIC_APP_NAME} ${dict.homepage.firstQuestion2}`}
            answer={`${dict.homepage.firstQuestionAnswer1} ${process.env.NEXT_PUBLIC_APP_NAME} ${dict.homepage.firstQuestionAnswer2}`}
            onClick={(answer: string, question: string) =>
              updateShownQuestion(answer, question)
            }
            selectedQuestion={selectedQuestion}
            shownAnswer={shownAnswer}
            showQuestion={
              selectedQuestion ===
              `${dict.homepage.firstQuestion1} ${process.env.NEXT_PUBLIC_APP_NAME} ${dict.homepage.firstQuestion2}`
            }
          />
          <Question
            question={dict.homepage.secondQuestion}
            answer={dict.homepage.secondQuestionAnswer}
            onClick={(answer: string, question: string) =>
              updateShownQuestion(answer, question)
            }
            topBorderNone={true}
            selectedQuestion={selectedQuestion}
            shownAnswer={shownAnswer}
            showQuestion={selectedQuestion === dict.homepage.secondQuestion}
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2 md:gap-x-[100px]">
          <Question
            question={`${dict.homepage.thirdQuestion1} ${process.env.NEXT_PUBLIC_APP_NAME} ${dict.homepage.thirdQuestion2}`}
            answer={thirdQuestionAnswer()}
            onClick={(answer: string, question: string) =>
              updateShownQuestion(answer, question)
            }
            selectedQuestion={selectedQuestion}
            shownAnswer={shownAnswer}
            showQuestion={
              selectedQuestion ===
              `${dict.homepage.thirdQuestion1} ${process.env.NEXT_PUBLIC_APP_NAME} ${dict.homepage.thirdQuestion2}`
            }
          />
          <Question
            question={`${dict.homepage.fourthQuestion1} ${process.env.NEXT_PUBLIC_APP_NAME} ${dict.homepage.fourthQuestion2}`}
            answer={`${process.env.NEXT_PUBLIC_APP_NAME} ${dict.homepage.fourthQuestionAnswer1} ${process.env.NEXT_PUBLIC_APP_NAME} ${dict.homepage.fourthQuestionAnswer2}`}
            onClick={(answer: string, question: string) =>
              updateShownQuestion(answer, question)
            }
            selectedQuestion={selectedQuestion}
            topBorderNone={true}
            shownAnswer={shownAnswer}
            showQuestion={
              selectedQuestion ===
              `${dict.homepage.fourthQuestion1} ${process.env.NEXT_PUBLIC_APP_NAME} ${dict.homepage.fourthQuestion2}`
            }
          />
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
