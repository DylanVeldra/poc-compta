import dynamic from 'next/dynamic';
import { ReactHookInput } from '@shared-components/inputs';
import { InputContainer } from '@shared-components/input-container';
import { useLanguageDictionary } from '@shared-hooks';
import { Icon } from '@shared-components/icon';
import { useEffect, useState } from 'react';

const PasswordChecklist: any = dynamic(
  () => import('react-password-checklist'),
  {
    ssr: false,
  },
);

interface PasswordVerificationProps {
  updateForm: (v: string, x: string) => void;
  getValues: any;
  errors: any;
  register: any;
  trigger: any;
}

export default function PasswordVerification(props: PasswordVerificationProps) {
  const dict = useLanguageDictionary();
  const [showPasswordVerification, setShowPasswordVerification] =
    useState(false);
  const [showConfirmPasswordVerification, setShowConfirmPasswordVerification] =
    useState(false);

  useEffect(() => {
    if (props.getValues().password?.length)
      setShowPasswordVerification(() => true);
    if (props.getValues().confirmPassword?.length)
      setShowConfirmPasswordVerification(() => true);
  }, [
    props.getValues().password,
    props.getValues().confirmPassword,
    setShowPasswordVerification,
  ]);

  return (
    <>
      <InputContainer noMargin={true} className="mb-[20px] lg:mb-[40px]">
        <ReactHookInput
          label={dict.registerFields.password}
          placeholder={dict.registerFields.password}
          name="password"
          type="password"
          updateForm={(name, value) => {
            props.updateForm(name, value);
            props.trigger(name);
          }}
          icon={true}
          register={props.register}
          required={true}
          errors={props.errors}
          errorMessage={props.errors.password}
          errorIcon={false}
        />
        {showPasswordVerification && (
          <div className="ml-3 mt-1 text-[13px]">
            <p
              className={`${
                props.getValues().password ===
                  props.getValues().confirmPassword &&
                props.getValues().password.length
                  ? 'text-green'
                  : 'text-gray opacity-50'
              }`}
            >
              {dict.registerFields.passwordChecklistLabel}
            </p>
            <PasswordChecklist
              rules={['minLength', 'specialChar', 'number', 'capital']}
              minLength={8}
              iconSize={12}
              value={props.getValues().password}
              valueAgain={props.getValues().confirmPassword}
              className="password-checklist"
              messages={{
                minLength: `${dict.errorMessages.minLength}`,
                specialChar: `${dict.errorMessages.specialChar}`,
                number: `${dict.errorMessages.number}`,
                capital: `${dict.errorMessages.capital}`,
              }}
              iconComponents={{
                ValidIcon: <Icon src="rs-check" className="mr-2 text-green" />,
                InvalidIcon: (
                  <Icon
                    src="ss-circle-small"
                    className="mr-2 text-light-gray dark:text-dark-gray"
                  />
                ),
              }}
            />
          </div>
        )}
      </InputContainer>
      <InputContainer noMargin={true} className="mb-[20px] lg:mb-[40px]">
        <ReactHookInput
          label={dict.registerFields.confirmPassword}
          placeholder={dict.registerFields.confirmPassword}
          name="confirmPassword"
          type="password"
          updateForm={(name, value) => {
            props.updateForm(name, value);
            props.trigger(name);
          }}
          register={props.register}
          required={true}
          icon={true}
          errors={props.errors}
          errorMessage={props.errors.confirmPassword}
          errorIcon={false}
        />
        {props.getValues().password === props.getValues().confirmPassword &&
          showConfirmPasswordVerification && (
            <div className="ml-3 mt-1 text-[13px]">
              {/* <p
              className={`${
                props.getValues().password === props.getValues().confirmPassword && props.getValues().confirmPassword.length
                  ? "text-green"
                  : "text-gray opacity-50"
              }`}
            >
              {dict.registerFields.passwordMatchLabel}
            </p> */}
              <PasswordChecklist
                rules={['match']}
                minLength={8}
                iconSize={12}
                value={props.getValues().password}
                valueAgain={props.getValues().confirmPassword}
                className="password-checklist"
                messages={{ match: `${dict.errorMessages.match}` }}
                iconComponents={{
                  ValidIcon: (
                    <Icon src="rs-check" className="mr-2 text-green" />
                  ),
                  InvalidIcon: (
                    <Icon
                      src="ss-circle-small"
                      className="mr-2 text-light-gray dark:text-dark-gray"
                    />
                  ),
                }}
              />
            </div>
          )}
      </InputContainer>
    </>
  );
}
