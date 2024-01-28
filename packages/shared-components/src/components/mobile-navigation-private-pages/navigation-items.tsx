import { Icon } from "@shared-components/icon";

const navigationItems = [
  {
    href: "/dashboard",
    icon: <Icon src="rs-dashboard" className="mr-3 text-xl" />,
  },
  {
    href: "/performance-monitoring",
    icon: <Icon src="rs-stats" className="mr-3 text-xl" />,
  },
  {
    href: "/withdrawal",
    icon: <Icon src="rs-arrow-from-right" className="mr-3 text-xl" />,
  },
  {
    href: "/deposit",
    icon: <Icon src="rs-arrow-to-right" className="mr-3 text-xl" />,
  },
  {
    href: "/history",
    icon: <Icon src="rs-clock" className="mr-3 text-xl" />,
  },
  {
    href: "/affiliation",
    icon: <Icon src="rs-users" className="mr-3 text-xl" />,
  },
  {
    href: "/profile",
    icon: <Icon src="rs-user" className="mr-3 text-xl" />,
  },
  {
    href: "/faq",
    icon: <Icon src="rs-interrogation" className="mr-3 text-xl"/>,
  },
];

export default navigationItems;