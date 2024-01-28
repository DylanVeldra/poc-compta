import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useLanguageDictionary, useProfile, useInterval } from "@shared-hooks";
import { FormLayout } from "@shared-components/forms";
import { EmailVerificationForm } from "../components/email-verification-form";
import { fetchJSON } from "@shared-utils";
import { Loader } from "@shared-components/loader";
import { StepMini } from "@shared-components/step-mini";
import { ToastGenerator } from "@shared-components/toast-generator";

// Helpers
import { emailCodeValidation } from "@shared-utils/validation";
import { useFormik } from "formik";
import { ChangeEmailModal } from "@shared-components/modals";

export default function EmailVerification() {
  const toastRef = useRef<any>();
  const [timer, setTimer] = useState(0);
  const [delay, setDelay] = useState<number>(1000);
  const [emailRequested, setEmailRequested] = useState(false);
  const router = useRouter();
  const { locale } = useRouter();
  const dict = useLanguageDictionary() as any;
  const [isOpen, setIsOpen] = useState(false);
  const {user, isLoading, setUser} = useProfile();

  useInterval(() => setTimer(timer + 1), emailRequested ? delay : null);

  const { handleSubmit, handleChange, values, errors, validateForm } =
    useFormik({
      initialValues: emailCodeValidation().initialValues,
      validationSchema: emailCodeValidation().schema,
      validateOnChange: false,
      onSubmit: async (values: any) => {
        const { code } = values;

        fetchJSON("/auth/email/verify", "POST", { code })
          .then(() => {
            const token = sessionStorage.getItem("refresh_token");
            fetchJSON(`/auth/refresh`, "POST", { token }).then((res) => {
              sessionStorage.setItem("access_token", res.body.access_token);
              sessionStorage.setItem("refresh_token", res.body.refresh_token);
              router.push("/enable-2fa");
            });
          })
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
      },
    });

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      validateForm();
      return;
    }

    if (isLoading) return;

    if (user?.emailVerified) {
      router.push("/dashboard");
    } else {
      onClickOnSendCodeAgain();
    }
  }, [isLoading, locale, router, user, validateForm]);

  useEffect(() => {
    if (timer > 59) {
      setTimer(0);
      setEmailRequested(false);
    }
  }, [setTimer, timer, setEmailRequested]);

  const onClickOnSendCodeAgain = () => {
    if (!emailRequested) {
      fetchJSON("/auth/email/register")
        .then(() => {
          toastRef.current.addToast({
            index: Math.random().toString(36).substring(2, 9),
            textContent: dict.checkEmail.validationCodeSent + " " + user.email,
            type: "SUCCESS",
            title: dict.checkEmail.validationCodeSentTitle,
          });
        })
        .catch((reason) => {
          if (reason.i18n !== "UNKNOWN_ERROR") {
            let errorMessage = dict.i18nServerErrors[reason.i18n];
            toastRef.current?.addToast({
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

      setEmailRequested(true);
    }
  };

  const onClickOnChangeEmail = () => {
    setIsOpen(false);
  };

  const subtitle =
    dict.checkEmail.subtitle +
    " " +
    (user ? user.email : "") +
    ". " +
    dict.checkEmail.codeIsValidDuring;

  const Subtitle = () => {
    return (
      <div className="">
        <p className="">
          {subtitle}
          <span
            className="ml-1 text-gold cursor-pointer hover:underline font-semibold"
            onClick={() => setIsOpen(true)}
          >
            {dict.checkEmail.changeEmail}
          </span>
        </p>
      </div>
    );
  };

  if (!user || user?.emailVerified) {
    return <Loader />;
  }

  const title = `${
    process.env.NEXT_PUBLIC_APP_NAME
  } | ${dict.checkEmail.title.toUpperCase()}`;

  return (
    <FormLayout
      title={dict.checkEmail.title}
      subtitle={<Subtitle />}
      marginTop={217}
      stepMini={<StepMini currentStep={2} />}
      showRegisterStepList={2}
    >
      <Head>
        <title>{title}</title>
      </Head>
      <ToastGenerator ref={toastRef} />
      <div className="mb-16 mt-8">
        <EmailVerificationForm
          onSubmit={handleSubmit}
          onClickOnSendCodeAgain={onClickOnSendCodeAgain}
          emailRequested={emailRequested}
          timer={timer}
          onChange={handleChange}
          updateForm={handleChange}
          value={values.code}
          errorMessage={errors.code}
        />
        <ChangeEmailModal
          onClose={(email) => {
            setUser({
              ...user,
              email,
            });
            setIsOpen(false);
          }}
          isOpen={isOpen}
          onClickOnChangeEmail={onClickOnChangeEmail}
        />
      </div>
    </FormLayout>
  );
}
