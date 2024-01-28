import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  marginBottom?: boolean;
  noBorder?: boolean;
  overflowHidden?: boolean;
}
export default function Container(props: ContainerProps) {
  return (
    <div
      className={`${
        props.marginBottom ? 'mb-10' : ''
      } bg-white dark:bg-dark-gray rounded-sm border-light-gray dark:border-gray
    ${props.noBorder ? '' : 'border-[1px]'} ${
        props.overflowHidden ? 'overflow-hidden' : ''
      }`}
    >
      <>{props.children}</>
    </div>
  );
}
