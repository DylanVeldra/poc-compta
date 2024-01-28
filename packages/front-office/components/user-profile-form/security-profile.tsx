import { Button } from "@shared-components/buttons";
import { SubWindow } from "@shared-components/sub-window";
import { Title } from "@shared-components/title";
import { useLanguageDictionary } from "@shared-hooks";
import { useRouter } from "next/router";
import AntiphishingCodePlaceholder from "./antiphishing/code-placeholder";

export const SecurityProfile = () => {
  const dict = useLanguageDictionary();
  const router = useRouter();
  return (
    <div className="mt-[60px] max-w-[804px] mx-auto">
      <SubWindow
        header={<>{dict.accountManagement.dashboard.security.title}</>}
      >
        <div className="text-[16px] font-semibold pb-2">
          {dict.accountManagement.dashboard.security.antiphishing.title}
        </div>
        <div className="text-md pb-4">
          {dict.accountManagement.dashboard.security.antiphishing.description1}
          {process.env.NEXT_PUBLIC_APP_NAME}
          {dict.accountManagement.dashboard.security.antiphishing.description2}
        </div>
        <div className="flex flex-col sm:flex-row space-x-0 space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <AntiphishingCodePlaceholder />
          </div>
          <div className="self-end">
            <Button
              buttonWidth={80}
              addClassName="text-md h-[42px]"
              label={
                dict.accountManagement.dashboard.security.antiphishing.change
              }
              onClick={() => {
                router.push("profile/antiphishing");
              }}
            />
          </div>
        </div>
        <div className="text-sm text-gray pt-1 pl-1">
          {dict.accountManagement.dashboard.security.antiphishing.warning1}{" "}
          {process.env.NEXT_PUBLIC_APP_NAME}
          {dict.accountManagement.dashboard.security.antiphishing.warning2}
        </div>
      </SubWindow>
    </div>
  );
};

export default SecurityProfile;
