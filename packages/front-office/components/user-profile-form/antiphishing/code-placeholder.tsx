import { Icon } from "@shared-components/icon";
import { SingleLineInput } from "@shared-components/inputs";
import { useLanguageDictionary } from "@shared-hooks";
import { fetchJSON } from "@shared-utils";
import { useEffect, useState } from "react";

export const AntiphishingCodePlaceholder = () => {
  const dict = useLanguageDictionary();
  const [codeHidden, setCodeHidden] = useState(true);
  const [code, setCode] = useState("");

  useEffect(() => {
    fetchJSON("/user/antiphishing/retrieve").then((res) => setCode(res.body));
  }, []);

  return (
    <SingleLineInput
      name="antiphishingCode"
      type="text"
      showAlwaysIcon={true}
      label={dict.accountManagement.dashboard.security.antiphishing.title}
      icon={
        <div className="flex space-x-6">
          {codeHidden ? (
            <div className="text-xl md:text-4xl  mt-2 md:mt-0 md:mb-1">
              • • • • • •
            </div>
          ) : (
            <div className="text-md">{code}</div>
          )}
          <div
            className="select-none"
            onClick={() => {
              setCodeHidden(!codeHidden);
            }}
          >
            <Icon
              src={codeHidden ? "rs-eye" : "rs-crossed-eye"}
              className={codeHidden ? "pt-[15px]" : "pt-[4px]"}
            />
          </div>
        </div>
      }
      disabled={true}
      customIconPadding="pr-[40px]"
      inputTextSize="text-md"
      marginLabel="mb-6 md:mb-0"
    ></SingleLineInput>
  );
};

export default AntiphishingCodePlaceholder;
