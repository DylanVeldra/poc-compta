import { AppIcon } from "@shared-components/app-icon";
import { useLanguageDictionary } from "@shared-hooks";

// items
import Router from "next/router";
import { Icon } from "@shared-components/icon";
import { Navigation } from "@shared-components/navigation";

interface SideBarProps {
  pathname: string;
  isAdmin?: boolean;
}

const Sidebar = (props: SideBarProps) => {
  const dict = useLanguageDictionary();

  const logout = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");

    Router.push({ pathname: "/", query: { logout: true } }, "/");
  };

  return (
    <div className="hidden w-[267px] bg-white dark:bg-dark-gray lg:flex flex-col justify-between pt-8">
      <AppIcon />
      <div className="h-full flex items-start relative">
        <Navigation pathname={props.pathname} isAdmin={props.isAdmin} />
      </div>
      <div
        className="flex items-center justify-center mb-[26px] cursor-pointer"
        onClick={logout}
      >
        <Icon src="rs-log-out" className="text-gold mr-3" />
        <p className="text-gold text-md my-0">{dict.logout}</p>
      </div>
    </div>
  );
};

export default Sidebar;
