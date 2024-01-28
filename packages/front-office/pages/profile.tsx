import { UserLayout } from "@shared-components/user-layout";
import { useLanguageDictionary } from "@shared-hooks";
import { UserContainer } from "components/user-container";
import { SecurityProfile } from "components/user-profile-form";
import { useRouter } from "next/router";

export default function Profile() {
  const dict = useLanguageDictionary();
  const router = useRouter();

  return (
    <UserLayout
      pathname={router.pathname}
      title={dict.accountManagement.sidebar[5]}
      isOnProfile
    >
      <UserContainer />
      <SecurityProfile />
    </UserLayout>
  );
}
