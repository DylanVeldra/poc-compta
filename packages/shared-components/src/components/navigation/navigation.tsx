import Link from 'next/link';
import { Divider } from '@shared-components/divider';
import { useLanguageDictionary } from '@shared-hooks';
import { useState } from 'react';
import { motion } from 'framer-motion';

// Navigation
import {
  navigationItemsBackOffice,
  navigationItemsFrontOffice,
} from '../../var/navigation';
import { useRouter } from 'next/router';

interface NavigationProps {
  pathname: string;
  isAdmin?: boolean;
}

interface hoveringItemType {
  [key: string]: boolean;
}

const Navigation = (props: NavigationProps) => {
  const dict = useLanguageDictionary();
  const router = useRouter();
  const [hoveringItem, setHoveringItem] = useState<hoveringItemType>();
  const [animationStart, setAnimationStart] = useState(210);
  const [animationOffset, setAnimationOffset] = useState(0);

  const items = props.isAdmin
    ? navigationItemsBackOffice
    : navigationItemsFrontOffice;
  const limit = props.isAdmin
    ? navigationItemsBackOffice.length - 2
    : navigationItemsFrontOffice.length - 3;

  return (
    <ul className="grid grid-cols-1 gap-y-6 mt-[94px] mx-auto overflow-hidden">
      {items.map((item, index) => (
        <li key={index}>
          <div
            onClick={() => {
              if (!item.isComingSoon && props.pathname !== item.href) {
                setAnimationStart(0);
                setAnimationOffset(-210);
                router.push(item.href);
              }
            }}
          >
            <a
              className={`flex items-center cursor-pointer py-3 relative hover:text-black dark:hover:text-white ${
                props.pathname.includes(item.href)
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
                {item.isComingSoon ? (
                  <>
                    <br />
                    <span className="text-sm italic text-gold">
                      Coming soon
                    </span>
                  </>
                ) : (
                  ''
                )}
              </p>
            </a>
          </div>
          {props.pathname.includes(item.href) && (
            <motion.div
              initial={{ x: animationStart }}
              animate={{ x: animationOffset }}
              transition={{ duration: 0.35 }}
            >
              <Divider className="bg-gradient-to-r from-gold h-1 w-10/12 absolute" />
            </motion.div>
          )}
          {index === limit && (
            <div className="mt-[30px] mb-[45px] w-full">
              <div className="absolute w-full h-[1px] bg-white-dimmed -ml-[30px]"></div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
