import en from "../../locales/en.json"

export type NavItem = {
  isSlicer?: boolean
  href: string
  icon: (pathname: string, hover: boolean) => JSX.Element
  isComingSoon: boolean
  i18n: keyof typeof en.accountManagement.sidebar
}
