import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { FormLayout } from "@shared-components/forms";
import { Button } from "@shared-components/buttons";
import { Modal } from "@shared-components/modals";
import { TwoFactorAuthForm } from "../components/two-factor-auth-form";
import { useLanguageDictionary, useProfile } from "@shared-hooks";
import { fetchJSON } from "@shared-utils";
import { Loader } from "@shared-components/loader";
import { StepMini } from "@shared-components/step-mini";
import { ToastGenerator } from "@shared-components/toast-generator";

export default function Enable2Fa() {
  const toastRef = useRef<any>();
  const [obtainedCode, setObtainedCode] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);
  const router = useRouter();
  const dict = useLanguageDictionary();
  const [user, isLoading] = useProfile();
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchJSON("/auth/2fa/generate")
      .then((json) => setObtainedCode(json.body))
      .catch((reason) => {
        if (reason.i18n !== "UNKNOWN_ERROR") {
          let errorMessage = dict.i18nServerErrors[reason.i18n];
          toastRef.current.addToast({
            index: Math.random().toString(36).substring(2, 9),
            textContent: errorMessage
              ? errorMessage
              : dict.serverErrors.general,
            type: "ERROR",
            title: "Oops !",
          });
        } else {
          router.push("/logout");
        }
        console.error(reason);
      });
  }, [dict, router]);

  useEffect(() => {
    if (!isLoading && user?.twoFactorVerified) {
      router.push("/dashboard");
    }
  });

  const onCodeSubmit = (code: string) => {
    setIsSubmitting(() => true);
    fetchJSON("/auth/2fa/verify", "POST", { code })
      .then((json) => {
        setIsCodeValid(() => true);
        setSecretKey(json.body);
      })
      .catch((reason) => {
        setIsCodeValid(() => false);
        if (reason.i18n !== "UNKNOWN_ERROR") {
          let errorMessage = dict.i18nServerErrors[reason.i18n];
          toastRef.current.addToast({
            index: Math.random().toString(36).substring(2, 9),
            textContent: errorMessage
              ? errorMessage
              : dict.serverErrors.general,
            type: "ERROR",
            title: "Oops !",
          });
        } else {
          router.push("/logout");
        }
        console.error(reason);
      })
      .finally(() => {
        setIsSubmitting(() => false);
      });
  };

  if (!user || user?.twoFactorVerified) {
    return <Loader />;
  }

  return (
    <FormLayout
      title={dict["2fa"].activateGoogleAuth}
      subtitle={`${dict["2fa"].activateGoogleAuthSubtitle1} ${process.env.NEXT_PUBLIC_APP_NAME} ${dict["2fa"].activateGoogleAuthSubtitle2}`}
      marginTop={62}
      showRegisterStepList={3}
      stepMini={<StepMini currentStep={3} />}
    >
      <ToastGenerator ref={toastRef} />
      <TwoFactorAuthForm
        onSubmit={onCodeSubmit}
        oauthCode={obtainedCode}
        secretKey={secretKey}
        isCodeValid={isCodeValid}
        isSubmitting={isSubmitting}
      />
      <div className="flex items-center justify-center mt-[60px]">
        <Button
          label={dict["2fa"].completeRegistration}
          onClick={() => setIsRegistrationComplete(true)}
          disabled={!isCodeValid}
          buttonWidth={250}
        />
      </div>
      <Modal
        class="text-center items-center flex mb-[20px]"
        icon={true}
        width={700}
        paddingY={"md:py-[110px]"}
        onClose={() => setIsRegistrationComplete(false)}
        isOpen={isRegistrationComplete}
        title={dict.registrationConfirmation.title}
        subtitle={
          <div>
            <div>{dict.registrationConfirmation.registerConfirmation}</div>
            <div>{dict.registrationConfirmation.emailConfirmation}</div>
          </div>
        }
      >
        <div className="flex items-center justify-center">
          <Button
            buttonWidth={250}
            label={dict.next}
            onClick={() => {
              sessionStorage.removeItem("refresh_token");
              sessionStorage.removeItem("access_token");
              router.push("/");
            }}
          />
        </div>
      </Modal>
    </FormLayout>
  );
}
