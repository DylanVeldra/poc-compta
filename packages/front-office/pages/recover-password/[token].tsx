import { Form } from "@shared-components/forms";
import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormLayout } from "@shared-components/forms";
import { fetchJSON } from "@shared-utils";
import { useLanguageDictionary } from "@shared-hooks";
import { ToastGenerator } from "@shared-components/toast-generator";
import { RecoverPassword } from "@shared-types";
import { PasswordVerification } from "@shared-components/password-verification";
import { Modal } from "@shared-components/modals";
import { Button } from "@shared-components/buttons";

// Yup Validation helper
import { passwordRecovery } from "@shared-utils/validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Login() {
  const toastRef = useRef<any>();
  const dict = useLanguageDictionary();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState(null);

  const {
    trigger,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(passwordRecovery().schema),
    defaultValues: passwordRecovery().initialValues,
    mode: "onChange",
  });

  useEffect(() => {
    setToken(router.query.token);
  }, [router]);

  const updateForm = (fieldName, value) => {
    setValue(fieldName, value);
  };

  const onSubmitHandler = () => {
    const { password } = getValues();
    onSubmit({ newPassword: password, token });
  };

  const onSubmit = (recoverPassword: RecoverPassword) => {
    fetchJSON("/auth/recover-password", "POST", { ...recoverPassword })
      .then(() => {
        setShowModal(() => true);
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
  };

  const title = `${
    process.env.NEXT_PUBLIC_APP_NAME
  } | ${dict.loginFields.login.toUpperCase()}`;

  return (
    <FormLayout
      title={dict.forgotPassword.resetPassword}
      subtitle={""}
      marginTop={250}
    >
      <Head>
        <title>{title}</title>
      </Head>
      <ToastGenerator ref={toastRef} />
      <Form
        onSubmit={handleSubmit(onSubmitHandler)}
        submitLabel={dict.validate}
        buttonStyle="mt-[61px]"
        buttonWidth={300}
        className="mt-20"
      >
        <PasswordVerification
          trigger={trigger}
          register={register}
          getValues={getValues}
          errors={errors}
          updateForm={(name, value) => updateForm(name, value)}
        />
      </Form>
      {showModal && (
        <Modal
          isOpen={showModal}
          icon={true}
          title={dict.forgotPassword.modalTitle}
          subtitle={dict.forgotPassword.resetPasswordSubtitleSuccess}
          class="mb-[20px]"
          noClosingIcon={true}
        >
          <Button
            label={dict.registerFields.login}
            onClick={() => router.push("/login")}
            buttonWidth={250}
            addClassName="mx-auto"
          />
        </Modal>
      )}
    </FormLayout>
  );
}
