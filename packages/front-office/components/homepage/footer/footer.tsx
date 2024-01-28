import { useLanguageDictionary } from "@shared-hooks";

const Footer = () => {
  const dict = useLanguageDictionary();

  return (
    <div className="w-full dark:bg-dark-gray-dimmed bg-white grid grid-cols-1 sm:grid-cols-2 px-[30px] sm:px-[60px] lg:pl-[124px] gap-y-[40px] lg:gap-y-0 py-[45px]">
      <div className="flex justify-left sm:justify-center">
        <div className="flex flex-col text-left ml-[40px]">
          <h5 className="text-lg text-gold mb-[30px]">
            {dict.homepage.footer.support.title}
          </h5>
          <p className="text-black dark:text-white mb-[16px]">
            {dict.homepage.footer.support.helpcenter}
          </p>
          <p className="text-black dark:text-white mb-[16px]">
            {dict.homepage.footer.support.fees}
          </p>
          <p className="text-black dark:text-white mb-[16px]">
            {dict.homepage.footer.support.identifyCheck}
          </p>
          <p className="text-black dark:text-white mb-[16px]">
            {dict.homepage.footer.support.contactUs}
          </p>
        </div>
      </div>
      <div className="flex justify-left">
        <div className="flex flex-col text-left ml-[40px]">
          <h5 className="text-lg text-gold mb-[30px]">
            {dict.homepage.footer.legalDisclaimer.title}
          </h5>
          <p className="text-black dark:text-white mb-[16px]">
            {dict.homepage.footer.legalDisclaimer.conditionsOfUse}
          </p>
          <p className="text-black dark:text-white mb-[16px]">
            {dict.homepage.footer.legalDisclaimer.privacyPolicy}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
