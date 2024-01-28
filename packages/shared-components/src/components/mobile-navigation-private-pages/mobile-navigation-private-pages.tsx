import Link from 'next/link';
import { useLanguageDictionary } from '@shared-hooks';
import { Config } from '@shared-components/config';
import { Icon } from '@shared-components/icon';
import { useState } from 'react';
import Router from 'next/router';

// Navigation
import {
  navigationItemsBackOffice,
  navigationItemsFrontOffice,
} from '../../var/navigation';
import { motion } from 'framer-motion';

interface MobileNavigationProps {
  setToggleMobileView: (v: boolean) => void;
  pathname: string;
  isAdmin?: boolean;
}

interface hoveringItemType {
  [key: string]: boolean;
}

const MobileNavigationPrivatePages = (props: MobileNavigationProps) => {
  const [hoveringItem, setHoveringItem] = useState<hoveringItemType>();
  const dict = useLanguageDictionary();

  const items = props.isAdmin
    ? navigationItemsBackOffice
    : navigationItemsFrontOffice;

  const logout = () => {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');

    Router.push('/login');
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        exit={{ opacity: 0 }}
        className="w-screen h-screen bg-dark-gray absolute top-0 bottom-0 left-0 right-0 z-10 opacity-75"
        onClick={() => props.setToggleMobileView(false)}
      ></motion.div>
      <motion.div
        initial={{ x: 350 }}
        animate={{ x: 0 }}
        exit={{ x: 350 }}
        transition={{ bounce: 0 }}
        className="fixed top-0 bottom-0 right-0 bg-fake-white dark:bg-dark-gray w-80 z-20"
      >
        <div className="h-full w-full relative flex flex-col justify-between">
          <div className="mt-6 ml-6">
            <Config />
          </div>
          <div
            onClick={() => props.setToggleMobileView(false)}
            className="cursor-pointer absolute top-8 right-6"
          >
            <Icon
              src="rs-cross"
              className="text-xl text-black dark:text-gray"
            />
          </div>
          <div className="overflow-y-scroll mt-7 w-full h-full">
            <ul>
              {items.map((item, index) => (
                <div key={index}>
                  <Link href={item.href}>
                    <li
                      className={`flex items-center cursor-pointer px-[29px] py-[19px] relative border-b border-gray ${
                        index === 0 && 'border-t'
                      } ${
                        props.pathname?.includes(item.href)
                          ? 'text-black dark:text-white'
                          : 'text-gray'
                      }`}
                      onMouseEnter={() =>
                        setHoveringItem({ ...hoveringItem, [item.href]: true })
                      }
                      onMouseLeave={() =>
                        setHoveringItem({ ...hoveringItem, [item.href]: false })
                      }
                    >
                      {item.icon(
                        props.pathname,
                        hoveringItem ? hoveringItem[item.href] : false,
                      )}
                      <p className="text-md">
                        {props.isAdmin
                          ? dict.accountManagement.adminSidebar[index]
                          : dict.accountManagement.sidebar[index]}
                      </p>
                    </li>
                  </Link>
                </div>
              ))}
            </ul>
          </div>
          <div
            className="flex items-center justify-center my-[26px] cursor-pointer"
            onClick={logout}
          >
            <Icon src="rs-log-out" className="text-gold mr-3" />
            <p className="text-gold text-md my-0">{dict.logout}</p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MobileNavigationPrivatePages;
