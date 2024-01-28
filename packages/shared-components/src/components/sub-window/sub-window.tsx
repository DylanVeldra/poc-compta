import { GradientBorder } from '@shared-components/gradient-border';
import { Icon } from '@shared-components/icon';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface SubWindowProps {
  header?: ReactNode;
  children: ReactNode;
  largePadding?: string;
  collapsable?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}
export default function SubWindow(props: SubWindowProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <GradientBorder>
      <div className="h-full flex flex-col">
        <div
          className="cursor-pointer bg-white dark:bg-dark-gray py-3 px-5 rounded-t-[2px] mb-[1px]"
          onClick={() => {
            setIsCollapsed(!isCollapsed);
            props.onCollapse?.(!isCollapsed);
          }}
        >
          <>
            <div className="flex justify-between items-center">
              <>{props.header}</>
              {props.collapsable ? (
                <div className="cursor-pointer">
                  <AnimatePresence initial={false} mode="wait">
                    <motion.div
                      key={!isCollapsed ? 'down' : 'up'}
                      initial={{ rotate: 0 }}
                      exit={{ rotate: 0 }}
                      animate={{ rotate: isCollapsed ? 180 : 0 }}
                    >
                      <Icon src="rs-caret-down" />
                    </motion.div>
                  </AnimatePresence>
                </div>
              ) : (
                <></>
              )}
            </div>
          </>
        </div>
        <AnimatePresence initial={false} mode="wait">
          {!props.collapsable || isCollapsed ? (
            <motion.div
              key={!props.collapsable || isCollapsed ? 'close' : 'open'}
              initial={{
                height: 0,
              }}
              animate={{
                height: 'auto',
              }}
              exit={{
                height: 0,
                paddingBottom: 0,
                paddingTop: 0,
              }}
              className={`bg-fake-white flex-1 dark:bg-fake-black rounded-b-[2px] ${
                props.largePadding ? props.largePadding : 'p-[16px] md:p-[30px]'
              }`}
            >
              <>{props.children}</>
            </motion.div>
          ) : (
            <></>
          )}
        </AnimatePresence>
      </div>
    </GradientBorder>
  );
}
