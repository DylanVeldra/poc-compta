import { Icon } from "@shared-components/icon";
import { useLanguageDictionary } from "@shared-hooks";

interface SuccessBannerProps {
  action?: boolean;
  removeItemFromArray: (v: any) => void;
  arrayOfMessages: any;
}

const SuccessBannerContainer = (props: SuccessBannerProps) => {
  const dict = useLanguageDictionary();

  return (
    <div
      className="md:max-w-[450px] max-h-[320px] w-full md:w-max absolute md:fixed top-[-10px] md:top-[29px] 
    md:right-[25px] z-50 h-screen flex flex-col ease-in-out duration-300 transition-all"
    >
      {props.arrayOfMessages.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className={`ease-in-out duration-300 transition-all	md:max-w-[450px] mt-2 w-full md:w-max bg-white dark:bg-dark-gray border-2 border-green rounded-md z-50`}
          >
            <div className="flex items-center px-[16px] py-[14px]">
              <div className="text-green flex items-center justify-center border-2 rounded-full w-[22px] h-[20px]">
                <Icon src="rs-check" className="text-green text-[10px]" />
              </div>
              <div className="flex flex-col px-[16px] w-full">
                <h5 className="text-[16px]">{dict.dataSaved}</h5>
                <div className="text-sm">
                  <div className="flex ">
                    <p>{dict.successBannerFirstPart}</p>&nbsp;
                    <p className="font-semibold">{item}</p>
                    &nbsp;<p>{dict.successBannerSecondPart}</p>
                  </div>
                </div>
              </div>
              <span onClick={() => props.removeItemFromArray(item)}>
                <Icon src="rs-cross" className="cursor-pointer text-black dark:text-white"/>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SuccessBannerContainer;
