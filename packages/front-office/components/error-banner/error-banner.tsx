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
      className={`md:max-w-[450px] w-full md:w-max bg-white dark:bg-dark-gray border-2 border-red dark:border-none rounded-md 
                  absolute md:fixed top-[-10px] md:top-[29px] md:right-[25px] z-50`}
    >
      <div className="flex items-center px-[16px] py-[14px]">
        <Icon src="rs-cross-circle" className="text-dark-red" />
        <div className="flex flex-col px-[16px] w-full">
          <h5 className="text-[16px]">Oops !</h5>
          <div className="text-sm">
            <p className="flex flex-col">
              {" "}
              {props.bannerContent}
              {props.action && (
                <span
                  className="text-sm underline cursor-pointer"
                  onClick={() => window.location.reload()}
                >
                  {dict.serverErrors.reloadPage}
                </span>
              )}
            </p>
          </div>
        </div>
        <span onClick={props.closeErrorModal}>
          <Icon src="rs-cross" className="cursor-pointer text-black dark:text-white"/>
        </span>
      </div>
    </div>
  );
};

export default ErrorBanner;
