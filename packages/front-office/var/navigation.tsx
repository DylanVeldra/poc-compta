import { Icon } from '@shared-components/icon';
import { CustomIcon } from '@shared-components/icon';
import { NavItem } from '../../shared-components/src/types/navigateur/NavItem';

export const navigationItemsBackOffice: NavItem[] = [
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
    i18n: 'dashboard',
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
    i18n: 'dashboard',
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
    i18n: 'dashboard',
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
    i18n: 'dashboard',
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
    i18n: 'dashboard',
  },
  {
    href: '/registration-management',
    icon: (pathname: string, hover: boolean) => (
      <Icon src="rs-user-add" className="mr-3 text-[16px]" />
    ),
    isComingSoon: false,
    i18n: 'dashboard',
  },
  {
    href: '/user-management',
    icon: (pathname: string) => (
      <Icon src="rs-users" className="mr-3 text-[16px]" />
    ),
    isComingSoon: false,
    i18n: 'dashboard',
  },
  {
    href: '/address-management',
    icon: (pathname: string) => (
      <Icon src="rs-wallet" className="mr-3 text-[16px]" />
    ),
    isComingSoon: false,
    i18n: 'dashboard',
  },
  {
    href: '/tag-management',
    icon: (pathname: string) => (
      <Icon src="rs-label" className="mr-3 text-[16px]" />
    ),
    isComingSoon: false,
    i18n: 'dashboard',
  },
  {
    isSlicer: true,
    href: '',
    icon: () => <></>,
    isComingSoon: false,
    i18n: 'dashboard',
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
    i18n: 'dashboard',
  },
];

export const navigationItemsFrontOffice: NavItem[] = [
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
    i18n: 'dashboard',
  },
  {
    href: '/incomes',
    icon: (pathname: string, hover: boolean) => (
      <CustomIcon
        hover={hover}
        iconName="arrow-right"
        className="mr-3 text-xl"
        isSelected={pathname.includes('incomes')}
      />
    ),
    isComingSoon: false,
    i18n: 'incomes',
  },
  {
    href: '/expenses',
    icon: (pathname: string, hover: boolean) => (
      <CustomIcon
        hover={hover}
        iconName="arrow-left"
        className="mr-3 text-xl"
        isSelected={pathname.includes('expenses')}
      />
    ),
    isComingSoon: false,
    i18n: 'expenses',
  },
    {
    href: '/customers',
    icon: (pathname: string, hover: boolean) => (
      <CustomIcon
        hover={hover}
        iconName="history"
        className="mr-3 text-xl"
        isSelected={pathname.includes('customers')}
      />
    ),
    isComingSoon: false,
    i18n: 'customer',
  },
  {
    href: '/banking',
    icon: (pathname: string, hover: boolean) => (
      <CustomIcon
        hover={hover}
        iconName="history"
        className="mr-3 text-xl"
        isSelected={pathname.includes('banking')}
      />
    ),
    isComingSoon: false,
    i18n: 'banking',
  },
  {
    isSlicer: true,
    href: '',
    icon: () => <></>,
    isComingSoon: false,
    i18n: 'dashboard',
  },
  {
    href: '/company',
    icon: (pathname: string, hover: boolean) => (
      <CustomIcon
        hover={hover}
        iconName="history"
        className="mr-3 text-xl"
        isSelected={pathname.includes('company')}
      />
    ),
    isComingSoon: false,
    i18n: 'company',
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
    i18n: 'profile',
  },
  {
    href: '/faq',
    icon: (pathname: string) => (
      <Icon src="rs-interrogation" className="mr-3 text-[16px]" />
    ),
    isComingSoon: true,
    i18n: 'qna',
  },
];
