import Link from 'next/link';
import { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';

// Components
import { DarkmodeButton } from '@shared-components/darkmode-button';
import { LanguageSwitcher } from '@shared-components/language-switcher';
import { Divider } from '@shared-components/divider';
import { Icon } from '@shared-components/icon';
import { MobileNavigationPrivatePages } from '@shared-components/mobile-navigation-private-pages';
import { formatAmount } from '@shared-utils';
import { AppIcon } from '@shared-components/app-icon';
import { useBalance } from '@shared-hooks';
import { AnimatePresence } from 'framer-motion';
interface HeaderProps {
  title: string | ReactNode;
  isAdmin?: boolean;
  isOnProfile?: boolean;
  pathname: string;
  goBackwards?: string;
}

const ProtectedPagesHeader = (props: HeaderProps) => {
  const [toggleMobileView, setToggleMobileView] = useState(false);
  const router = useRouter();
  const balance = useBalance(props.isAdmin);

  return (
    <div className="flex flex-col w-[100%] mx-auto">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
        <div className="w-full flex items-center justify-between lg:hidden cursor-pointer mb-12 lg:mb-0">
          <div>
            <AppIcon />
          </div>
          <div onClick={() => setToggleMobileView(true)}>
            <Icon
              src="rs-burger-menu"
              className="text-black dark:text-white text-2xl"
            />
          </div>
        </div>
        <h2 className="text-[30px] font-base font-sans text-fake-black dark:text-white flex items-center">
          {props.goBackwards && (
            <div onClick={() => router.push(`${props.goBackwards}`)}>
              <Icon
                src="rs-angle-left"
                className="text-black dark:text-white text-lg cursor-pointer mr-5"
              />
            </div>
          )}
          <>
            {props.title || (
              <Link href="/">
                <a>
                  <AppIcon />
                </a>
              </Link>
            )}
          </>
        </h2>
        <div className="hidden lg:flex items-center h-[36px]">
          <ul className="flex items-center mr-5 bg-white dark:bg-dark-gray rounded-sm h-[36px] py-[10px] px-[7px] shadow-light dark:shadow-dark">
            <li className="mx-[10px] h-[16px]">
              <DarkmodeButton changeIconPosition={true} />
            </li>
            <li className="mx-[12px] h-[16px]">
              <LanguageSwitcher />
            </li>
            <li className="mx-[12px] h-[18px]">
              <Icon src="rs-bell" className="mt-0.5" />
            </li>
            {!props.isOnProfile ? (
              <Link href="/profile" locale="fr">
                <li className="mx-[12px] h-[18px] cursor-pointer">
                  <Icon src="rs-user" />
                </li>
              </Link>
            ) : (
              <></>
            )}
          </ul>
          <div
            className={`bg-gold w-[90px] h-[36px] leading-[36px] rounded-sm text-center shadow-light dark:shadow-dark`}
          >
            <span className="text-white dark:text-fake-black font-roboto font-semibold text-lg inline-block align-middle leading-normal">
              {formatAmount(balance / 100)}
            </span>
          </div>
        </div>
      </div>

      <Divider className="mt-4" />

      <AnimatePresence>
        {toggleMobileView && (
          <MobileNavigationPrivatePages
            isAdmin={props.isAdmin}
            pathname={props.pathname}
            setToggleMobileView={setToggleMobileView}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProtectedPagesHeader;
