import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CustomIconProps {
  width?: string;
  height?: string;
  className?: string;
  iconName: string;
  isSelected?: boolean;
  hover?: boolean;
}

const CustomIcon = (props: CustomIconProps) => {
  const theme = useTheme();
  const [imgSrc, setImgSrc] = useState(
    `/images/icons/${props.iconName}-${theme.theme}.svg`
  );

  useEffect(() => {
    if (props.isSelected) {
      setImgSrc(
        () => `/images/icons/${props.iconName}-${theme.theme}-selected.svg`
      );
      return;
    }

    setImgSrc(() => `/images/icons/${props.iconName}-${theme.theme}.svg`);
  }, [props.isSelected, theme]);

  useEffect(() => {
    // If the element is already selected, no needs of triggering the hover effect
    if (props.isSelected) return;

    if (props.hover) {
      setImgSrc(
        () => `/images/icons/${props.iconName}-${theme.theme}-selected.svg`
      );
      return;
    }

    setImgSrc(() => `/images/icons/${props.iconName}-${theme.theme}.svg`);
    setTimeout(() => {
      setImgSrc(() => `/images/icons/${props.iconName}-${theme.theme}.svg`);
    }, 450);
  }, [props.hover]);

  return (
    <div className={props.className ? props.className : ""}>
      <Image
        width={props.width ? props.width : 16}
        height={props.height ? props.height : 16}
        src={imgSrc}
      />
    </div>
  );
};

export default CustomIcon;
