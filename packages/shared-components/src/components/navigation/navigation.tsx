import Link from 'next/link';
import { Divider } from '@shared-components/divider';
import { useLanguageDictionary } from '@shared-hooks';
import { useState } from 'react';
import { motion } from 'framer-motion';

// Navigation
import {
  NavItem,
} from '../../var/navigation';
import { useRouter } from 'next/router';

interface NavigationProps {
  pathname: string;
  navItems: NavItem[];
}

interface hoveringItemType {
  [key: string]: boolean;
}

const renderSlicer = (index: number) => (
  <li key={index}>
    <div className="mt-[30px] mb-[45px] w-full">
      <div className="absolute w-full h-[1px] bg-white-dimmed -ml-[30px]"></div>
    </div>
  </li>
)

const RenderNavItem = ({pathname, navItem, index}: {pathname: string, navItem: NavItem, index: number}) => {
  const dict = useLanguageDictionary();
  const router = useRouter();
  const [hoveringItem, setHoveringItem] = useState<hoveringItemType>();
  const [animationStart, setAnimationStart] = useState(210);
  const [animationOffset, setAnimationOffset] = useState(0);


  return (
    <li key={index}>
          <div
            onClick={() => {
              if (!navItem.isComingSoon && pathname !== navItem.href) {
                setAnimationStart(0);
                setAnimationOffset(-210);
                router.push(navItem.href);
              }
            }}
          >
            <a
              className={`flex items-center cursor-pointer py-3 relative hover:text-black dark:hover:text-white ${
                pathname.includes(navItem.href)
                  ? 'text-black dark:text-white'
                  : 'text-gray'
              }`}
              onMouseEnter={() =>
                setHoveringItem({ ...hoveringItem, [navItem.href]: true })
              }
              onMouseLeave={() =>
                setHoveringItem({ ...hoveringItem, [navItem.href]: false })
              }
            >
              {navItem.icon(
                pathname,
                hoveringItem ? hoveringItem[navItem.href] : false,
              )}
              <p className="text-md">
                {dict.accountManagement.sidebar[navItem.i18n]}
                {navItem.isComingSoon ? (
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
          {pathname.includes(navItem.href) && (
            <motion.div
              initial={{ x: animationStart }}
              animate={{ x: animationOffset }}
              transition={{ duration: 0.35 }}
            >
              <Divider className="bg-gradient-to-r from-gold h-1 w-10/12 absolute" />
            </motion.div>
          )}
        </li>
  )
}

const Navigation = (props: NavigationProps) => {
  return (
    <ul className="grid grid-cols-1 gap-y-6 mt-[94px] mx-auto overflow-hidden">
      {props.navItems.map((item, index) => {

        if (item.isSlicer) {
          return renderSlicer(index)
        } else {
          return <RenderNavItem pathname={props.pathname} index={index} navItem={item} />
        }
      }
    )}
    </ul>
  );
};

export default Navigation;
