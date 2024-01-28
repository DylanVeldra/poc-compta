import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useLanguageDictionary, useProfile } from '@shared-hooks';
import { Form } from '../forms';
import { SingleLineInput } from '../inputs';

// Helpers
import { changeEmailValidation } from '@shared-utils/validation';
import { useFormik } from 'formik';
import { Modal } from './modal';
import { fetchJSON } from '@shared-utils';
import { ToastGenerator } from '@shared-components/toast-generator';

interface ModalProps {
  isOpen: boolean;
  onClose?: (email: string) => void;
  onClickOnChangeEmail: () => void;
}

export const ChangeEmailModal = (props: ModalProps) => {
  const dict = useLanguageDictionary();
  const { locale } = useRouter();
  const {user, isLoading} = useProfile(false);
  const [subtitle, setSubtitle] = useState('');
  const toastRef = useRef<any>();

  const { handleSubmit, handleChange, values, errors, validateForm } =
    useFormik({
      initialValues: changeEmailValidation().initialValues,
      validationSchema: changeEmailValidation().schema,
      validateOnChange: false,
      onSubmit: (values: { email: string }) => {
        fetchJSON('/user/email/change', 'PATCH', values)
          .then(() => {
            props.onClose?.(values.email);
            toastRef.current.addToast({
              index: Math.random().toString(36).substring(2, 9),
              textContent: dict.checkEmail.setNewEmailAdress,
              type: 'SUCCESS',
              title: dict.checkEmail.setNewEmailTitle,
            });
          })
          .catch((err) => {
            console.error(err);
            toastRef.current.addToast({
              index: Math.random().toString(36).substring(2, 9),
              textContent: dict.checkEmail.serverError,
              type: 'ERROR',
              title: 'Oops !',
            });
          });
      },
    });

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      validateForm();
    }
  }, [locale]);

  useEffect(() => {
    if (user?.email) {
      setSubtitle(
        () =>
          dict.checkEmail.changeEmailModalSubtitleOne +
          ' ' +
          user?.email +
          ' ' +
          dict.checkEmail.changeEmailModalSubtitleTwo,
      );
    }
  }, [isLoading]);

  return (
    <Modal
      isOpen={props.isOpen}
      title={dict.checkEmail.changeEmail}
      onClose={props.onClose as () => void}
      subtitle={subtitle}
      class="text-center md:text-left"
    >
      <ToastGenerator ref={toastRef} />
      <Form
        onSubmit={handleSubmit}
        submitLabel={dict.validate}
        buttonWidth={300}
      >
        <div className="mb-11 sm:mb-16 md:mb-32 mt-[40px] md:mt-10">
          <SingleLineInput
            type="email"
            name="email"
            placeholder="johndoe@company.com"
            label={dict.registerFields.email}
            updateForm={handleChange}
            value={values.email}
            errorMessage={errors.email}
          />
        </div>
      </Form>
    </Modal>
  );
};

export default ChangeEmailModal;
