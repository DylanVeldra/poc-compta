import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormLayout, ForgotPasswordForm } from "@shared-components/forms";
import { fetchJSON } from "@shared-utils";
import { useLanguageDictionary, useInterval } from "@shared-hooks";
import { TextWithLink } from "@shared-components/text-with-link";
import { ToastGenerator } from "@shared-components/toast-generator";

export default function ForgotPassword() {
  const toastRef = useRef<any>();
  const dict = useLanguageDictionary() as any;
  const router = useRouter();
  const [timer, setTimer] = useState(0);
  const [delay, setDelay] = useState<number>(1000);
  const [emailRequested, setEmailRequested] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useInterval(
    () => setTimer(timer + 1),
    (emailRequested ? delay : null) as number
  );

  const onSubmit = (email: string) => {
    fetchJSON("/auth/forgot-password", "POST", { email })
      .then((json) => {
        setUserEmail(email);
        setEmailSent(true);
      })
      .catch((reason) => console.error(reason));
    setEmailRequested(() => true);
  };

  const Subtitle = () => {
    return (
      <TextWithLink
        text={`${dict.forgotPassword.subtitle1} ${process.env.NEXT_PUBLIC_APP_NAME} ${dict.forgotPassword.subtitle2}`}
        link={""}
        onClick={() => router.push("/register")}
      />
    );
  };

  const onClickSendEmailAgain = () => {
    if (!emailRequested) {
      fetchJSON("/auth/forgot-password", "POST", { email: userEmail })
        .then(() => {
          if (toastRef.current) {
            if (userEmail) {
              toastRef.current.addToast({
                index: Math.random().toString(36).substring(2, 9),
                textContent:
                  dict.forgotPassword.validationCodeSent + " " + userEmail,
                type: "SUCCESS",
                title: dict.forgotPassword.validationCodeSentTitle,
              });
            } else {
              toastRef.current.addToast({
                index: Math.random().toString(36).substring(2, 9),
                textContent: dict.forgotPassword.validationCodeSentWithoutEmail,
                type: "SUCCESS",
                title: dict.forgotPassword.validationCodeSentTitle,
              });
            }
          }
        })
        .catch((reason) => {
          if (toastRef.current) {
            let errorMessage = dict.i18nServerErrors[reason.i18n];
            toastRef.current.addToast({
              index: Math.random().toString(36).substring(2, 9),
              textContent: errorMessage
                ? errorMessage
                : dict.serverErrors.general,
              type: "ERROR",
              title: "Oops !",
            });
          }
          console.error(reason);
        });
      setEmailRequested(() => true);
    }
  };

  useEffect(() => {
    if (timer > 29) {
      setTimer(0);
      setEmailRequested(() => false);
    }
  }, [setTimer, timer, setEmailRequested]);

  const title = `${
    process.env.NEXT_PUBLIC_APP_NAME
  } | ${dict.loginFields.login.toUpperCase()}`;

  return (
    <FormLayout
      class="mb-[20px]"
      title={
        emailSent ? dict.forgotPassword.emailSent : dict.forgotPassword.title
      }
      subtitle={emailSent ? "" : <Subtitle />}
      marginTop={250}
    >
      <Head>
        <title>{title}</title>
      </Head>
      <ToastGenerator ref={toastRef} />
      {emailSent ? (
        <div className="mt-[100px] flex flex-col">
          <p className="text-md">{dict.forgotPassword.emailSentp1}</p>
          <div className="flex items-center">
            <p className="px-[20px] rounded-sm py-[10px] text-[16px] border-[1px] border-gold font-semibold my-[30px] ">
              {userEmail}
            </p>
            <small
              className={`text-sm  ml-[40px] ${
                emailRequested ? "text-gray cursor-not-allowed" : "text-gold"
              } font-base cursor-pointer col-span-4 justify-self-end text-sm`}
              onClick={onClickSendEmailAgain}
            >
              {emailRequested
                ? dict.forgotPassword.sentEmailAgainIn +
                  " " +
                  (30 - timer) +
                  " " +
                  dict.checkEmail.sendCodeAgainTime
                : dict.forgotPassword.sentEmailAgain}
            </small>
          </div>
          <p className="text-md">{dict.forgotPassword.emailSentp2}</p>
        </div>
      ) : (
        <ForgotPasswordForm onSubmit={onSubmit} />
      )}
    </FormLayout>
  );
}
