import { Button } from "@shared-components/buttons";
import { SingleLineInput } from "@shared-components/inputs";
import { SubWindow } from "@shared-components/sub-window";
import { Title } from "@shared-components/title";
import { useLanguageDictionary } from "@shared-hooks";
import { useRef, useState } from "react";
import AntiphishingCodePlaceholder from "./antiphishing/code-placeholder";
import { fetchJSON } from "@shared-utils";
import { TwoFactorsAuthenticationModal } from "@shared-components/modals";
import { ToastGenerator } from "@shared-components/toast-generator";
import { useRouter } from "next/router";

interface UpdateAntiphishing {}

export const UpdateAntiphishingCode = (props: UpdateAntiphishing) => {
  const toastRef = useRef<any>();
  const router = useRouter();
  const onSubmit = (res) => {
    fetchJSON("/user/antiphishing", "PUT", {
      twoFactorToken: res.twoFactorToken,
      emailCode: res.emailCode,
      antiPhishingCode: code,
    })
      .then(() => {
        setShowModal(false);
        toastRef.current.addToast({
          index: Math.random().toString(36).substring(2, 9),
          textContent:
            dict.accountManagement.dashboard.security.antiphishing.updateSuccess
              .content,
          type: "SUCCESS",
          title:
            dict.accountManagement.dashboard.security.antiphishing.updateSuccess
              .title,
        });
        // TODO faire toast de succès sur la page profile
        router.push("/profile");
      })
      .catch(() => {
        setShowModal(false);
        toastRef.current.addToast({
          index: Math.random().toString(36).substring(2, 9),
          textContent:
            dict.accountManagement.dashboard.security.antiphishing.updateError
              .content,
          type: "ERROR",
          title:
            dict.accountManagement.dashboard.security.antiphishing.updateError
              .title,
        });
      });
  };
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dict = useLanguageDictionary();
  return (
    <div className="mt-[60px] max-w-[804px] mx-auto">
      <SubWindow
        header={
          <Title
            title={
              dict.accountManagement.dashboard.security.antiphishing.updateCode
            }
            size="lg"
            class="pl-3"
          />
        }
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}
        >
          <div className="space-y-10">
            <div>
              <div className="space-y-8">
                <div>
                  <AntiphishingCodePlaceholder />
                </div>
                <SingleLineInput
                  name="code"
                  value=""
                  onChange={(e) => {
                    setCode(e);
                    setError(!/^[A-Z0-9]{6}$/.test(e));
                  }}
                  maxlength={6}
                  borders={true}
                  errorMessage={
                    error ? (
                      <div className="pt-1 pl-1">
                        {
                          dict.accountManagement.dashboard.security.antiphishing
                            .errorFormat
                        }
                      </div>
                    ) : null
                  }
                  placeholder={
                    dict.accountManagement.dashboard.security.antiphishing
                      .example
                  }
                  label={
                    <div className="flex space-x-3">
                      <div>
                        {
                          dict.accountManagement.dashboard.security.antiphishing
                            .newCodeLabel
                        }
                      </div>
                      <div className="text-gray">
                        {
                          dict.accountManagement.dashboard.security.antiphishing
                            .codeFormat
                        }
                      </div>
                    </div>
                  }
                />
              </div>
              <div className="text-sm text-gray pt-1 pl-1">
                {
                  dict.accountManagement.dashboard.security.antiphishing
                    .warning1
                }{" "}
                {process.env.NEXT_PUBLIC_APP_NAME}
                {
                  dict.accountManagement.dashboard.security.antiphishing
                    .warning2
                }
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                disabled={error || code.length === 0}
                label={dict.registrationManagement.validate}
                buttonWidth={120}
              />
            </div>
          </div>
        </form>
      </SubWindow>
      <TwoFactorsAuthenticationModal
        onClose={() => {
          setShowModal(false);
        }}
        isOpen={showModal}
        onSubmit={onSubmit}
      />
      <ToastGenerator ref={toastRef} />
    </div>
  );
};

export default UpdateAntiphishingCode;
