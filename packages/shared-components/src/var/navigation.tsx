import { Icon } from '@shared-components/icon';
import { CustomIcon } from '@shared-components/icon';

export const navigationItemsBackOffice = [
  {
    href: '/statistic-follow-up',
    icon: (pathname: string | undefined, hover: boolean) => (
      <CustomIcon
        hover={hover}
        iconName="apps"
        className="mr-3 text-xl"
        isSelected={pathname?.includes('statistic-follow-up')}
      />
    ),
    isComingSoon: true,
  },
  {
    href: '/performance-management',
    icon: (pathname: string, hover: boolean) => (
      <CustomIcon
        hover={hover}
        iconName="chart-histogram"
        className="mr-3 text-xl"
        isSelected={pathname.includes('performance-management')}
      />
    ),
    isComingSoon: false,
  },
  {
    href: '/withdrawal',
    icon: (pathname: string, hover: boolean) => (
      <CustomIcon
        hover={hover}
        iconName="arrow-left"
        className="mr-3 text-xl"
        isSelected={pathname.includes('withdrawal')}
      />
    ),
    isComingSoon: false,
  },
  {
    href: '/deposit',
    icon: (pathname: string, hover: boolean) => (
      <CustomIcon
        hover={hover}
        iconName="arrow-right"
        className="mr-3 text-xl"
        isSelected={pathname.includes('deposit')}
      />
    ),
    isComingSoon: false,
  },
  {
    href: '/history',
    icon: (pathname: string, hover: boolean) => (
      <CustomIcon
        hover={hover}
        iconName="history"
        className="mr-3 text-xl"
        isSelected={pathname.includes('history')}
      />
    ),
    isComingSoon: false,
  },
  {
    href: '/registration-management',
    icon: (pathname: string, hover: boolean) => (
      <Icon src="rs-user-add" className="mr-3 text-[16px]" />
    ),
    isComingSoon: false,
  },
  {
    href: '/user-management',
    icon: (pathname: string) => (
      <Icon src="rs-users" className="mr-3 text-[16px]" />
    ),
    isComingSoon: false,
  },
  {
    href: '/address-management',
    icon: (pathname: string) => (
      <Icon src="rs-wallet" className="mr-3 text-[16px]" />
    ),
    isComingSoon: false,
  },
  {
    href: '/tag-management',
    icon: (pathname: string) => (
      <Icon src="rs-label" className="mr-3 text-[16px]" />
    ),
    isComingSoon: false,
  },
  {
    href: '/profile',
    icon: (pathname: string, hover: boolean) => (
      <CustomIcon
        hover={hover}
        iconName="profile"
        className="mr-3 text-xl"
        isSelected={pathname.includes('profile')}
      />
    ),
    isComingSoon: true,
  },
];

export const navigationItemsFrontOffice = [
  {
    href: '/dashboard',
    icon: (pathname: string, hover: boolean) => (
      <CustomIcon
        hover={hover}
        iconName="apps"
        className="mr-3 text-xl"
        isSelected={pathname.includes('dashboard')}
      />
    ),
    isComingSoon: false,
  },
  {
    href: '/performance-monitoring',
    icon: (pathname: string, hover: boolean) => (
      <CustomIcon
        hover={hover}
        iconName="chart-histogram"
        className="mr-3 text-xl"
        isSelected={pathname.includes('performance-monitoring')}
      />
    ),
    isComingSoon: false,
  },
  {
    href: '/withdrawal',
    icon: (pathname: string, hover: boolean) => (
      <CustomIcon
        hover={hover}
        iconName="arrow-left"
        className="mr-3 text-xl"
        isSelected={pathname.includes('withdrawal')}
      />
    ),
    isComingSoon: false,
  },
  {
    href: '/deposit',
    icon: (pathname: string, hover: boolean) => (
      <CustomIcon
        hover={hover}
        iconName="arrow-right"
        className="mr-3 text-xl"
        isSelected={pathname.includes('deposit')}
      />
    ),
    isComingSoon: false,
  },
  {
    href: '/history',
    icon: (pathname: string, hover: boolean) => (
      <CustomIcon
        hover={hover}
        iconName="history"
        className="mr-3 text-xl"
        isSelected={pathname.includes('history')}
      />
    ),
    isComingSoon: false,
  },
  {
    href: '/profile',
    icon: (pathname: string, hover: boolean) => (
      <CustomIcon
        hover={hover}
        iconName="profile"
        className="mr-3 text-xl"
        isSelected={pathname.includes('profile')}
      />
    ),
    isComingSoon: false,
  },
  {
    href: '/faq',
    icon: (pathname: string) => (
      <Icon src="rs-interrogation" className="mr-3 text-[16px]" />
    ),
    isComingSoon: true,
  },
];
