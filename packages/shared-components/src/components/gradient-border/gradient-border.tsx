import { ReactNode } from 'react';

interface GradientBorderProps {
  children: ReactNode;
}
export default function GradientBorder(props: GradientBorderProps) {
  return (
    <div className="h-full w-full relative rounded-sm before:shadow-light before:dark:shadow-dark bg-clip-padding before:content-[''] before:absolute before:top-0 before:left-0 before:bottom-0 before:right-0 before:m-[-1px] before:z-[-1] z-0 before:bg-gradient-to-r before:from-gold before:rounded-sm">
      <div className="h-full">
        <>{props.children}</>
      </div>
    </div>
  );
}
