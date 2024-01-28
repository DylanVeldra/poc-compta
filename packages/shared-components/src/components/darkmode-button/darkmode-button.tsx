import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { CustomIcon } from "@shared-components/icon";
interface DarkmodeButtonProps {
  changeIconPosition?: boolean;
}

export default function DarkmodeButton(props: DarkmodeButtonProps) {
  const { theme, setTheme } = useTheme();

  /*
   * Darkmode first
   */
  const [isDark, setIsDark] = useState(theme === "dark");

  const onClick = () => {
    const d = !isDark;

    setIsDark(d);
    setTheme(d ? "dark" : "light");
  };

  useEffect(() => {
    if (!localStorage.getItem("dark-mode")) {
      localStorage.setItem("dark-mode", "true");
      onClick();
      return;
    }
    setIsDark(theme === "dark" ? true : false);
  }, []);

  return (
    <div onClick={onClick} className="cursor-pointer">
      <CustomIcon iconName="light" className={`${props.changeIconPosition ? "-mt-0.5" : "mt-0.5"} `} />
    </div>
  );
}
