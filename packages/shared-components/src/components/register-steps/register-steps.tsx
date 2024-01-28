import { Icon } from "@shared-components/icon";
import { useLanguageDictionary } from "@shared-hooks";

interface RegisterStepProps {
  step: number;
}

const RegisterStep = ({ step }: RegisterStepProps) => {
  const dict = useLanguageDictionary()

  return (
    <div className="text-md flex flex-col fixed mt-[291px]">
      <div className="flex items-center z-40">
        <div
          className={`relative rounded-full text-gold px-3 py-1 border-2 border-gold relative dark:bg-dark-gray bg-white z-40`}
        >
          {step === 1 ? (
            "1"
          ) : (
            <div className="h-6 w-2">
              <Icon src="rs-check" className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-gold" />
            </div>
          )}
        </div>
        <div className="text-gold" style={{ marginLeft: "27px" }}>
          {dict.registerFields.stepOne}
        </div>
      </div>
      <div className="z-10" style={{ height: "79px" }}>
        <div
          className="w-28 bg-gold h-1 rotate-90 mt-8 "
          style={{ marginLeft: "-38px" }}
        ></div>
      </div>

      <div className={`flex items-center z-40`}>
        <div
          className={`dark:bg-dark-gray bg-white rounded-full px-3 py-1 border-2 relative dark:bg-dark-gray bg-white 
                            ${
                              step === 2 || step > 2
                                ? "text-gold border-gold"
                                : "dark:text-gold-dimmed text-gold dark:border-gold-dimmed border-gold"
                            }`}
        >
          {step === 2 || step < 2 ? (
            "2"
          ) : (
            <div className="h-6 w-2">
              <Icon src="rs-check" className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-gold" />
            </div>
          )}
        </div>
        <div
          className={`${step === 2 || step > 2 ? "text-gold" : "dark:text-white"}`}
          style={{ marginLeft: "27px" }}
        >
          {dict.registerFields.stepTwo}
        </div>
      </div>

      <div className="z-10" style={{ height: "79px" }}>
        <div
          className={`w-40 z-10 h-1 rotate-90 mt-8 ${step === 3 && "bg-gold"} ${step < 3 && "bg-gradient-to-r from-gold"}
        `}
          style={{ marginLeft: "-62px" }}
        ></div>
      </div>

      <div className="flex items-center z-40">
        <div
          className={`dark:bg-dark-gray bg-white rounded-full text-gold px-3 py-1 border-2 relative ${
            step === 3 || step > 3
              ? "dark:bg-dark-gray bg-white border-gold"
              : "dark:text-silver-dimmed dark:bg-dark-gray bg-white text-gold-dimmed dark:border-silver-dimmed border-gold text-opacity-50 border-opacity-50 dark:opacity-100 "
          } `}
        >
          {step === 3 || step < 3 ? (
            "3"
          ) : (
            <div className="h-6 w-2">
              <Icon src="rs-check" className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-gold" />
            </div>
          )}
        </div>
        <div
          className={`${step === 3 || step > 3 ? "text-gold" : "dark:text-white"}`}
          style={{ marginLeft: "27px" }}
        >
          {dict.registerFields.stepThree}
        </div>
      </div>
    </div>
  );
};

export default RegisterStep;
