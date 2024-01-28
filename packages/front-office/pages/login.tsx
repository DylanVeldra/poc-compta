import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormLayout, LoginForm } from "@shared-components/forms";
import { fetchJSON } from "@shared-utils";
import jwt_decode from "jwt-decode";
import { useLanguageDictionary, useProfile } from "@shared-hooks";
import { TextWithLink } from "@shared-components/text-with-link";
import { Loader } from "@shared-components/loader";
import {
  TwoFactorsAuthenticationModal,
  Modal,
} from "@shared-components/modals";
import {
  User,
  Credentials,
  CredentialsWithAuthenticationCodes,
} from "@shared-types";
import { ToastGenerator } from "@shared-components/toast-generator";
import { Button } from "@shared-components/buttons";

export default function Login() {
  const toastRef = useRef<any>();
  const dict = useLanguageDictionary();
  const router = useRouter();
  const [user, isLoading] = useProfile(false);
  const [showModal, setShowModal] = useState(false);
  const [showBannedModal, setShowBannedModal] = useState(false);
  const [showRegistrationInProgressModal, setShowRegistrationInProgressModal] =
    useState(false);
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!isLoading && user && user.twoFactorLogged && user.emailLogged) {
      router.push("/dashboard");
    }
  }, [isLoading, user, router]);

  const onLogin = (credentials: Credentials) => {
    fetchJSON("/auth/login", "POST", credentials)
      .then((json) => {
        sessionStorage.setItem("access_token", json.body.access_token);
        sessionStorage.setItem("refresh_token", json.body.refresh_token);

        const user = jwt_decode(json.body.access_token) as User;

        if (!user.emailVerified) {
          router.push("/email-verification");
          return;
        }

        if (!user.twoFactorVerified) {
          router.push("/enable-2fa");
          return;
        }

        if (user.status === "BANNED") {
          setShowBannedModal(true);
          return;
        }

        if (user.status === "REGISTRATION_IN_PROGRESS") {
          setShowRegistrationInProgressModal(true);
          return;
        }

        setCredentials(credentials);
        setShowModal(true);
      })
      .catch((reason) => {
        let errorMessage = dict.i18nServerErrors[reason.i18n];
        toastRef.current.addToast({
          index: Math.random().toString(36).substring(2, 9),
          textContent: errorMessage ? errorMessage : dict.serverErrors.general,
          type: "ERROR",
          title: "Oops !",
        });
        console.error(reason);
      });
  };

  const onSubmit = (values: CredentialsWithAuthenticationCodes) => {
    const { emailCode, twoFactorToken } = values;

    const credentialsWithAuthentication: CredentialsWithAuthenticationCodes = {
      email: credentials.email,
      password: credentials.password,
      twoFactorToken,
      emailCode,
    };

    fetchJSON("/auth/login", "POST", credentialsWithAuthentication)
      .then((json: any) => {
        sessionStorage.setItem("access_token", json.body.access_token);
        sessionStorage.setItem("refresh_token", json.body.refresh_token);
        setCredentials({ email: "", password: "" });

        router.push("/dashboard");
      })
      .catch((reason: any) => {
        toastRef.current.addToast({
          index: Math.random().toString(36).substring(2, 9),
          textContent:
            dict["2fa"].serverError[reason.i18n] ??
            dict["2fa"].formErrorMessage.generic,
          type: "ERROR",
          title: "Oops",
        });
      });
  };

  const Subtitle = () => {
    return (
      <TextWithLink
        text={dict.loginFields.doNotHasAccount}
        link={dict.loginFields.register}
        onClick={() => router.push("/register")}
      />
    );
  };

  const showToast = (
    type: "SUCCESS" | "ERROR" | "WARNING" | "INFO",
    title: string,
    textContent: string
  ) => {
    toastRef.current.addToast({
      index: Math.random().toString(36).substring(2, 9),
      textContent: textContent,
      type: type,
      title: title,
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  const title = `${
    process.env.NEXT_PUBLIC_APP_NAME
  } | ${dict.loginFields.login.toUpperCase()}`;

  return (
    <FormLayout
      title={dict.loginFields.connection}
      subtitle={<Subtitle />}
      marginTop={200}
    >
      <Head>
        <title>{title}</title>
      </Head>
      <ToastGenerator ref={toastRef} />
      <LoginForm onSubmit={onLogin} />
      <TwoFactorsAuthenticationModal
        onClose={() => setShowModal(false)}
        isOpen={showModal}
        onSubmit={onSubmit}
        showToast={showToast}
        email={credentials.email}
        isLogin={true}
      />
      {setShowRegistrationInProgressModal && (
        <Modal
          paddingY={"md:py-[110px]"}
          class="text-center mb-5"
          isOpen={showRegistrationInProgressModal}
          width={700}
          title={dict.loginFields.registrationInProgressTitle}
          subtitle={dict.loginFields.registrationInProgressSubtitle}
          noClosingIcon={true}
          onClose={() => setShowRegistrationInProgressModal(false)}
          subtitleClass="text-center font-light"
          illustration={true}
          illustrationSrc="https://via.placeholder.com/120"
        >
          <div className="flex justify-center items-center mt-2">
            <Button
              buttonWidth={250}
              label={dict.loginFields.goBackHome}
              onClick={() => router.push("/")}
            />
          </div>
        </Modal>
      )}
      {setShowBannedModal && (
        <Modal
          paddingY={"md:py-[110px]"}
          class="text-center mb-5"
          isOpen={showBannedModal}
          width={700}
          title={dict.loginFields.accountBlocked}
          subtitle={dict.loginFields.accountBlockedSubtitle}
          noClosingIcon={true}
          onClose={() => setShowBannedModal(false)}
          subtitleClass="text-center font-light"
          illustration={true}
          illustrationSrc="https://via.placeholder.com/120"
        >
          <div className="flex justify-center items-center mt-2">
            <Button
              buttonWidth={250}
              type="secondary"
              label={dict.loginFields.contactSupport}
              onClick={() => router.push("/")}
              addClassName="mr-[20px]"
            />
            <Button
              buttonWidth={250}
              label={dict.loginFields.goBackHome}
              onClick={() => router.push("/")}
            />
          </div>
        </Modal>
      )}
    </FormLayout>
  );
}
