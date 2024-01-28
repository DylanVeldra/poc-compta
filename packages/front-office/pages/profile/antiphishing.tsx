import { Icon } from "@shared-components/icon";
import { UserLayout } from "@shared-components/user-layout";
import { useLanguageDictionary } from "@shared-hooks";
import { User } from "@shared-types";
import { UpdateAntiphishingCode } from "components/user-profile-form";
import { useRouter } from "next/router";
import { useState } from "react";

const ChangeAntiphishing = () => {
  const dict = useLanguageDictionary();
  const [user, setUser] = useState<User>();
  const onProfileLoaded = (userRes: User) => {
    setUser(userRes);
  };
  const router = useRouter();
  return (
    <UserLayout
      pathname={router.pathname}
      title={
        <div
          className="flex"
          onClick={() => {
            router.push("/profile");
          }}
        >
          <div className="pt-1">
            <Icon src="ss-angle-small-left" />
          </div>
          <div>{dict.accountManagement.sidebar[6]}</div>
        </div>
      }
      onProfileLoaded={onProfileLoaded}
    >
      <UpdateAntiphishingCode />
    </UserLayout>
  );
};

export default ChangeAntiphishing;
