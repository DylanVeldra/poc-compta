import { ReactNode, useState } from 'react';

interface TooltipProps {
  children: ReactNode;
  label: string | ReactNode;
  size?: 'sm' | 'md' | 'lg';
}
export default function Tooltip(props: TooltipProps) {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const after =
    "after:content-[' '] after:absolute after:bottom-full after:right-1/2 after:left-1/2 after:-translate-x-1/2 after:border-[5px] after:border-transparent after:border-b-fake-black after:dark:border-b-fake-black ";

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsDisplayed(true)}
      onTouchStart={() => setIsDisplayed(true)}
      onMouseLeave={() => setIsDisplayed(false)}
      onTouchEnd={() => setIsDisplayed(false)}
    >
      <div>
        <>{props.children}</>
      </div>
      {isDisplayed ? (
        <div
          className={`${
            !props.size || props.size === 'sm'
              ? 'w-[94px]'
              : props.size === 'md'
              ? 'w-[150px]'
              : 'w-[248px]'
          } text-sm absolute left-1/2 top-[150%] md:-translate-x-1/2 text-center text-white bg-fake-black py-[7px] px-[5px] rounded-sm z-50 dark:shadow-dark ${after}`}
        >
          <>{props.label}</>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
