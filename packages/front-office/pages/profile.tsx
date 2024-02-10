import { UserLayout } from "@shared-components/user-layout";
import { useLanguageDictionary } from "@shared-hooks";
import { UserContainer } from "components/user-container";
import { SecurityProfile } from "components/user-profile-form";
import { useRouter } from "next/router";
import { navigationItemsFrontOffice } from "var/navigation";

export default function Profile() {
  const dict = useLanguageDictionary();
  const router = useRouter();

  return (
    <UserLayout
      pathname={router.pathname}
      navItems={navigationItemsFrontOffice}
      title={dict.accountManagement.sidebar[5]}
      isOnProfile
    >
      <UserContainer />
      <SecurityProfile />
    </UserLayout>
  );
}
