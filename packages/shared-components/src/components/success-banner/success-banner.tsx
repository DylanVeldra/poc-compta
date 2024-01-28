import { useLanguageDictionary } from "@shared-hooks";
import { Icon } from "@shared-components/icon";

interface ErrorBannerProps {
  bannerContent: string;
  action?: boolean;
  closeErrorModal: () => void;
}

const ErrorBanner = (props: ErrorBannerProps) => {
  const dict = useLanguageDictionary();

  return (
    <div
      className={`md:max-w-[450px] mt-2 w-full md:w-max bg-white dark:bg-dark-gray border-2 
      border-green rounded-md z-50 fixed right-5 top-[29px]`}
    >
      <div className="flex items-center px-[16px] py-[14px]">
        <div>
          <Icon src="rs-check-circle" className="text-green" />
        </div>
        <div className="flex flex-col px-[16px] w-full">
          <h5 className="text-[16px]">{dict.dataSaved}</h5>
          <div className="text-sm">
            <p className="flex flex-col">
              {props.bannerContent}
            </p>
          </div>
        </div>
        <span onClick={props.closeErrorModal}>
          <Icon src="rs-cross" className="cursor-pointer text-white dark:text-black"/>
        </span>
      </div>
    </div>
  );
};

export default ErrorBanner;
