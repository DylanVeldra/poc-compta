import { useState, ReactNode } from "react";
import Link from "next/link";
import { useLanguageDictionary } from "@shared-hooks";
import { AppIcon } from "@shared-components/app-icon";
import { MobileNavigation } from "@shared-components/mobile-navigation";
import { useRouter } from "next/router";
import { Icon } from "@shared-components/icon";
interface HeaderProps {
  config: ReactNode;
  showRegistration: boolean;
}

const Header = (props: HeaderProps) => {
  const router = useRouter();
  const [toggleMobileView, setToggleMobileView] = useState(false);
  const dict = useLanguageDictionary();

  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 mr-2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );

  return (
    <header className="flex w-full justify-between p-6 px-11 pt-10">
      <h2 className="font-semibold text-xl tracking-tight pl-2">
        <AppIcon />
      </h2>
      <nav className="flex lg:justify-around lg:flex-row sm:items-center sm:flex-col hidden md:block">
        <ul className="flex items-center w-full justify-around flex-wrap">
          <li
            className="mr-7 flex items-center justify-center text-gold font-semibold focus:ring-4 focus:outline-none focus:ring-green w-40 h-9 text-center text-base cursor-pointer disabled:cursor-not-allowed"
            onClick={() => router.push("/login")}
          >
            <a className="flex items-center">
              {icon} {dict.loginFields.login}
            </a>
          </li>
          {props.showRegistration && (
            <li
              className="mr-16 flex items-center justify-center w-40 h-9 bg-gold hover:bg-fake-white 
              dark:hover:bg-fake-black hover:border-2 hover:rounded-md
                dark:hover:text-gold hover:text-gold text-white dark:text-black 
              disabled:bg-lighter-gray dark:disabled:bg-dark-gray rounded-md font-medium 
              focus:ring-4 focus:outline-none focus:ring-green text-center text-base cursor-pointer disabled:cursor-not-allowed"
              onClick={() => router.push("/register")}
            >
              <a>{dict.registerFields.register}</a>
            </li>
          )}
          <li>
            <>{props.config}</>
          </li>
        </ul>
      </nav>
      <div
        className="md:hidden items-center cursor-pointer mt-3"
        onClick={() => setToggleMobileView(true)}
      >
        <Icon
          src="rs-burger-menu"
          className="text-black dark:text-white text-2xl"
        />
      </div>
      {toggleMobileView && (
        <MobileNavigation setToggleMobileView={setToggleMobileView} />
      )}
    </header>
  );
};

export default Header;
