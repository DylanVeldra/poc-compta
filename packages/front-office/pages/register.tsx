import { useRef, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormLayout } from "@shared-components/forms";
import { TextWithLink } from "@shared-components/text-with-link";
import RegisterForm from "../components/register-form/register-form";
import { RegisterCredentials } from "@shared-types";
import { fetchJSON } from "@shared-utils";
import { useLanguageDictionary, useProfile } from "@shared-hooks";
import { Loader } from "@shared-components/loader";
import { StepMini } from "@shared-components/step-mini";
import { ToastGenerator } from "@shared-components/toast-generator";

export default function Register() {
  const dict = useLanguageDictionary() as any;
  const router = useRouter();
  const toastRef = useRef<any>();

  const [user, isLoading] = useProfile(false);

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard");
    }
  });

  const showToastErrorMessage = (message: string) => {
    toastRef.current.addToast({
      index: Math.random().toString(36).substring(2, 9),
      textContent: message,
      type: "ERROR",
      title: "Oops !",
    });
  };

  const onSubmit = (user: RegisterCredentials) => {
    if (!user.telegramAccount) delete user.telegramAccount;

    fetchJSON("/auth/register", "POST", user)
      .then(() => {
        fetchJSON("/auth/login", "POST", user).then((res) => {
          sessionStorage.setItem("access_token", res.body.access_token);
          sessionStorage.setItem("refresh_token", res.body.refresh_token);
          router.push("/email-verification");
        });
      })
      .catch((reason) => {
        if (reason.i18n) {
          let errorMessage = dict.i18nServerErrors[reason.i18n][reason.body];
          toastRef.current.addToast({
            index: Math.random().toString(36).substring(2, 9),
            textContent: errorMessage
              ? errorMessage
              : dict.i18nServerErrors.general,
            type: "ERROR",
            title: "Oops !",
          });
          console.error(reason);
        }
      });
  };
  const Subtitle = () => {
    return (
      <TextWithLink
        text={dict.registerFields.alreadyHasAccount}
        link={dict.registerFields.login}
        onClick={() => router.push("/login")}
      />
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  const title = `${
    process.env.NEXT_PUBLIC_APP_NAME
  } | ${dict.registerFields.register.toUpperCase()}`;

  return (
    <FormLayout
      title={dict.welcome}
      subtitle={<Subtitle />}
      marginTop={85}
      stepMini={<StepMini currentStep={1} />}
      showRegisterStepList={1}
    >
      <Head>
        <title>{title}</title>
      </Head>
      <ToastGenerator ref={toastRef} />
      <RegisterForm
        onSubmit={onSubmit}
        showToastErrorMessage={showToastErrorMessage}
      />
    </FormLayout>
  );
}
