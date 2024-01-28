import Link from "next/link";
import { useTheme } from "next-themes";
import { useLanguageDictionary } from "@shared-hooks";
import { DarkmodeButton } from "../darkmode-button";
import { LanguageSwitcher } from "../language-switcher";
import { Icon } from "@shared-components/icon";
import { useRouter } from "next/router";
interface MobileNavigationProps {
  setToggleMobileView: (v: boolean) => void;
}

const MobileNavigationPrivatePages = ({ setToggleMobileView }: MobileNavigationProps) => {
  const dict = useLanguageDictionary();
  const { setTheme } = useTheme();
  const router = useRouter();

  const ChangeLanguage = () => {
    router.push({ pathname: router.pathname, query: router.query }, router.asPath, { locale: router.locale === "en" ? "fr" : "en" });
  };

  const onClick = () => {
    const d = localStorage.getItem("dark-mode") === "light" ? true : false;
    localStorage.setItem("dark-mode", d ? "dark" : "light");

    setTheme(d ? "dark" : "light");
  };

  const icon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  return (
    <>
      <div
        className="w-screen h-screen bg-dark-gray absolute top-0 bottom-0 left-0 right-0 z-10 opacity-75"
        onClick={() => setToggleMobileView(false)}
      ></div>
      <div className="fixed top-0 bottom-0 right-0 bg-fake-white dark:bg-dark-gray w-80 z-20">
        <div className="h-full w-full relative flex flex-col items-center ">
          <div
            onClick={() => setToggleMobileView(false)}
            className="cursor-pointer absolute top-8 right-6 w-[100px] flex items-center justify-end h-[40px]"
          >
            <Icon src="rs-cross" className="text-xl text-black dark:text-gray" />
          </div>{" "}
          <div className="mt-20">
            <ul className="flex flex-col">
              <li className="flex items-center justify-center text-gold font-semibold focus:ring-4 focus:outline-none focus:ring-green w-40 h-9 text-center text-base cursor-pointer disabled:cursor-not-allowed">
                <Link href="/login">
                  <a className="flex items-center">
                    {icon} {dict.loginFields.login}
                  </a>
                </Link>
              </li>
              {process.env.NEXT_PUBLIC_INTERFACE === "FO" && (
                <li
                  className="mt-4 flex items-center justify-center w-40 h-9 bg-gold hover:bg-fake-white dark:hover:bg-fake-black hover:outline-2 hover:outline hover:outline-gold dark:hover:text-gold hover:text-gold text-white 
                dark:text-black disabled:bg-lighter-gray dark:disabled:bg-dark-gray 
                rounded-md font-medium focus:ring-4 focus:outline-none focus:ring-green 
                text-center text-base cursor-pointer disabled:cursor-not-allowed"
                >
                  <Link href="/register">
                    <a>{dict.registerFields.register}</a>
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className="overflow-y-scroll mt-14 w-full">
            <ul>
              <li className="pr-6 pl-9 flex items-center justify-between border-t border-white dark:border-opacity-20">
                <p onClick={onClick} className="w-full my-5 cursor-pointer">
                  {dict.mobileNavigation.theme}
                </p>
                <div className="my-5">
                  <DarkmodeButton />
                </div>
              </li>
              <li className="py-5 pr-6 pl-9 flex items-center justify-between border-t border-white dark:border-opacity-20">
                <p onClick={ChangeLanguage} className="w-full cursor-pointer">
                  {dict.mobileNavigation.language}
                </p>

                <LanguageSwitcher />
              </li>
              <li className="py-5 pl-9 border-t border-white dark:border-opacity-20">{dict.mobileNavigation.FAQ}</li>
              <li className="py-5 pl-9 border-t border-white dark:border-opacity-20">{dict.mobileNavigation.CGU}</li>
              <li className="py-5 pl-9 border-t border-b border-white dark:border-opacity-20">{dict.mobileNavigation.Licence}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavigationPrivatePages;
