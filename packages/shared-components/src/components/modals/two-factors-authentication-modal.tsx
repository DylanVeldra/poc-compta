import { useState, useEffect } from 'react';
import { InputContainer } from '../input-container';
import { SingleLineInput } from '../inputs';
import { Button } from '../buttons';
import { useLanguageDictionary, useInterval, useProfile } from '@shared-hooks';

// helpers
import { fetchJSON } from '@shared-utils';
import { twoFactorsModalValidation } from '@shared-utils/validation';
import { useFormik } from 'formik';
import { CredentialsWithAuthenticationCodes } from '@shared-types';
import { Modal } from './modal';
import { Icon } from '@shared-components/icon';
import { Tooltip } from '@shared-components/tooltip';

interface ModalProps {
  disableButton?: boolean;
  isOpen: boolean;
  onClose?: () => void;
  icon?: boolean;
  class?: string;
  onSubmit: (v: CredentialsWithAuthenticationCodes) => void;
  showToast?: (
    type: 'SUCCESS' | 'ERROR' | 'WARNING' | 'INFO',
    title: string,
    textContent: string,
  ) => void;
  email?: string;
  isLogin?: boolean;
}

export const TwoFactorsAuthenticationModal = (props: ModalProps) => {
  const dict = useLanguageDictionary();
  const [timer, setTimer] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [emailRequested, setEmailRequested] = useState(false);
  const {user, isLoading} = useProfile();

  useInterval(
    () => setTimer(timer + 1),
    (emailRequested ? delay : null) as number,
  );

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    validateForm,
    validateField,
    resetForm,
  } = useFormik({
    initialValues: twoFactorsModalValidation().initialValues,
    validationSchema: twoFactorsModalValidation().schema,
    validateOnChange: false,
    onSubmit: props.onSubmit,
  });

  useEffect(() => {
    resetForm();
  }, [props.onClose]);

  const onClickOnSendCodeAgain = () => {
    if (emailRequested) {
      return;
    }
    fetchJSON(`/auth/email/${props.isLogin ? 'login' : 'request'}`)
      .then(() => {
        if (props.showToast) {
          if (user) {
            props.showToast(
              'SUCCESS',
              dict.checkEmail.validationCodeSentTitle,
              dict.checkEmail.validationCodeSent + ' ' + user.email,
            );
          } else {
            props.showToast(
              'SUCCESS',
              dict.checkEmail.validationCodeSentTitle,
              dict.checkEmail.validationCodeSentWithoutEmail,
            );
          }
        }
      })
      .catch((reason) => {
        if (props.showToast) {
          const errorMessage = (dict.i18nServerErrors as any)[reason.i18n];
          props.showToast(
            'ERROR',
            'Oops !',
            errorMessage ? errorMessage : dict.serverErrors.general,
          );
        }
        console.error(reason);
      });
    setEmailRequested(() => true);
  };

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      validateForm();
    }

    if (props.isOpen) {
      onClickOnSendCodeAgain();
    }
  }, [props.isOpen]);

  useEffect(() => {
    if (timer > 29) {
      setTimer(0);
      setEmailRequested(() => false);
    }
  }, [setTimer, timer, setEmailRequested]);

  if (!props.isOpen) {
    return <></>;
  }

  return (
    <Modal
      class="pb-5"
      clickOutsideModal={false}
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={dict['2fa'].modalTitle}
      subtitle={dict['2fa'].modalSubtitle}
      width={900}
      sizeTitle={'3xl'}
    >
      <form className="md:px-0" onSubmit={handleSubmit}>
        <InputContainer className="grid-cols-1 mt-[30px] relative">
          <SingleLineInput
            label={dict.checkEmail.verificationCode}
            name="emailCode"
            onBlur={() => validateField('emailCode')}
            required={true}
            updateForm={(e) => {
              handleChange(e);
            }}
            value={values.emailCode || ''}
            errorMessage={errors.emailCode || ''}
            minlength={6}
            maxlength={6}
          />

          {/* sm */}
          <div className="flex md:hidden flex-row justify-between">
            <small className=" flex flex-row max-w-[50%] text-gray text-sm space-x-1">
              <Tooltip
                label={`${dict.checkEmail.mobileCodeSend} ${props.email}. ${dict.checkEmail.mobileGoogleAuth}`}
                size="lg"
              >
                <div className="mt-1">
                  <Icon src={'rs-info'}></Icon>
                </div>
              </Tooltip>
              <span>{dict.checkEmail.codeValidity}</span>
            </small>
            <small
              className={`max-w-[50%] text-gray text-sm ${
                emailRequested ? 'text-gray cursor-not-allowed' : 'text-gold'
              } font-base cursor-pointer col-span-4 text-right justify-self-end text-sm`}
              onClick={onClickOnSendCodeAgain}
            >
              {emailRequested
                ? dict.checkEmail.sendCodeAgainIn +
                  ' ' +
                  (30 - timer) +
                  ' ' +
                  dict.checkEmail.sendCodeAgainTime
                : dict.checkEmail.sendCodeAgain}
            </small>
          </div>

          {/* md */}
          <div className="hidden md:flex flex-col-reverse sm:flex-row justify-between mt-2">
            <small className="max-w-[70%] xl:max-w-full text-gray col-span-8 text-sm">
              {dict.checkEmail.inputDescription +
                ' ' +
                (props.email ? props.email : user?.email) +
                '. ' +
                dict.checkEmail.codeValidity}
            </small>
            <small
              className={`text-sm md:top-12 mb-2 ${
                emailRequested ? 'text-gray cursor-not-allowed' : 'text-gold'
              } font-base cursor-pointer col-span-4 justify-self-end text-sm`}
              onClick={onClickOnSendCodeAgain}
            >
              {emailRequested
                ? dict.checkEmail.sendCodeAgainIn +
                  ' ' +
                  (30 - timer) +
                  ' ' +
                  dict.checkEmail.sendCodeAgainTime
                : dict.checkEmail.sendCodeAgain}
            </small>
          </div>
        </InputContainer>
        <InputContainer className="grid-cols-1 mt-5 md:mt-[80px] relative">
          <SingleLineInput
            label={dict['2fa'].twoFactorLabelText}
            name="twoFactorToken"
            onBlur={() => validateField('twoFactorToken')}
            required={true}
            updateForm={handleChange}
            value={values.twoFactorToken || ''}
            errorMessage={errors.twoFactorToken}
            minlength={6}
            maxlength={6}
          />
          {/* sm */}
          <div className="flex md:hidden flex-row justify-between">
            <small className=" flex flex-row max-w-[50%] text-gray text-sm space-x-1">
              <Tooltip label={dict.checkEmail.mobileThirty} size="lg">
                <div className="mt-1">
                  <Icon src={'rs-info'}></Icon>
                </div>
              </Tooltip>
              <span>informations</span>
            </small>
            <small
              className={`max-w-[50%] text-gold font-base cursor-pointer col-span-4 justify-self-end text-sm`}
            >
              <span>{dict['2fa'].twoFactorHelpLink}</span>
            </small>
          </div>

          {/* md */}
          <div className="hidden md:flex flex-col-reverse sm:flex-row justify-between mt-2">
            <small className="sm:max-w-[50%] lg:max-w-[70%] xl:max-w-full text-gray text-sm">
              {dict['2fa'].twoFactorInputDescription}
            </small>
            <small className="md:top-12 mb-2 text-gold font-base cursor-pointer col-span-4 justify-self-end text-sm">
              {dict['2fa'].twoFactorHelpLink}
            </small>
          </div>
        </InputContainer>
        <div className="flex items-center justify-center mt-5 md:mt-[101px]">
          <Button
            disabled={props.disableButton ? props.disableButton : false}
            label={dict.validate}
            buttonWidth={window.innerWidth < 768 ? 768 : 250}
          />
        </div>
      </form>
    </Modal>
  );
};
