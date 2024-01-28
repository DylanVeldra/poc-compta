import { Form } from "@shared-components/forms";
import {
  PhoneInput,
  DatePicker,
  CountryList,
  ReactHookInput,
  SignUpCheckbox,
} from "@shared-components/inputs";
import { InputContainer } from "@shared-components/input-container";
import { RegisterCredentials } from "@shared-types";
import { PasswordVerification } from "@shared-components/password-verification";
import { useLanguageDictionary } from "@shared-hooks";

// Yup Validation helper
import { signUpValidation } from "@shared-utils/validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

interface RegisterFormProps {
  onSubmit: (user: RegisterCredentials) => void;
  showToastErrorMessage: (toastMessage: string) => void;
}

export default function RegisterForm(props: RegisterFormProps) {
  const dict = useLanguageDictionary();

  const {
    trigger,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(signUpValidation().schema),
    defaultValues: signUpValidation().initialValues,
    mode: "onBlur",
  });

  const updateForm = (fieldName, value) => {
    setValue(fieldName, value);
  };

  const onSubmitHandler = () => {
    const values = getValues();

    const {
      email,
      password,
      firstname,
      lastname,
      prefix,
      phoneNumber,
      taxResidenceCountry,
      telegramAccount,
      optIn,
      termsOfService,
    } = getValues();
    const birthDate = new Date(
      +values.birthYear,
      +values.birthMonth - 1,
      +values.birthDay
    );

    props.onSubmit({
      email,
      password,
      firstname,
      lastname,
      phoneNumber: prefix + phoneNumber,
      birthDate,
      taxResidenceCountry,
      telegramAccount,
      optIn,
      termsOfService,
    });
  };

  useEffect(() => {
    // We check if there are errors first
    if (Object.values(errors).length) {
      // Only focus on an element if the element is an input
      const input = document.querySelector(
        `input[name="${Object.keys(errors)[0]}"]`
      ) as HTMLElement;

      input?.focus();

      document
        .querySelector(`input[name="${Object.keys(errors)[0]}"]`)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });

      props.showToastErrorMessage(dict.i18nServerErrors.required);
    }
  }, [errors]);

  return (
    <Form
      onSubmit={handleSubmit(onSubmitHandler)}
      submitLabel={dict.registerFields.register}
      buttonStyle="mt-[61px]"
      buttonWidth={250}
    >
      <InputContainer
        noMargin={true}
        className="grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-[40px] mb-[40px]"
      >
        <ReactHookInput
          label={dict.registerFields.firstname}
          placeholder={dict.registerFields.firstname}
          name="firstname"
          updateForm={(name, value) => updateForm(name, value)}
          register={register}
          required={true}
          errors={errors}
          errorIcon={errors.firstname ? true : false}
        />
        <ReactHookInput
          label={dict.registerFields.lastname}
          placeholder={dict.registerFields.lastname}
          name="lastname"
          updateForm={(name, value) => updateForm(name, value)}
          register={register}
          required={true}
          errors={errors}
          errorIcon={errors.lastname ? true : false}
        />
      </InputContainer>
      <InputContainer
        noMargin={true}
        className="grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-[40px] mb-[40px]"
      >
        <DatePicker
          label={dict.registerFields.birthDate}
          values={getValues()}
          updateForm={(name, value) => updateForm(name, value)}
          errors={errors}
        />
        <CountryList
          marginTop={0}
          label={dict.registerFields.country}
          values={{ taxResidenceCountry: getValues().taxResidenceCountry }}
          updateForm={(name, value) => updateForm(name, value)}
          errors={errors}
        />
      </InputContainer>
      <InputContainer
        noMargin={true}
        className="grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-[40px] mb-[40px]"
      >
        <PhoneInput
          label={dict.registerFields.phoneNumber}
          name="phoneNumber"
          updateForm={(name, value) => updateForm(name, value)}
          errors={errors}
          register={register}
          trigger={trigger}
        />
        <ReactHookInput
          label={dict.registerFields.telegram}
          placeholder={dict.registerFields.telegram}
          name="telegramAccount"
          updateForm={(name, value) => updateForm(name, value)}
          register={register}
          required={false}
          errors={errors}
          errorIcon={errors.telegramAccount ? true : false}
        />
      </InputContainer>
      <InputContainer noMargin={true} className="grid-cols-1 gap-6 mb-[40px]">
        <ReactHookInput
          label={dict.registerFields.email}
          placeholder={dict.registerFields.email}
          name="email"
          type="email"
          updateForm={(name, value) => updateForm(name, value)}
          register={register}
          required={true}
          errors={errors}
          errorIcon={errors.email ? true : false}
        />
      </InputContainer>
      <PasswordVerification
        trigger={trigger}
        register={register}
        getValues={getValues}
        errors={errors}
        updateForm={(name, value) => updateForm(name, value)}
      />
      <div className="flex flex-col w-full mt-[40px] md:mt-[61px]">
        <SignUpCheckbox
          checked={getValues().optIn}
          label={`${dict.registerFields.firstCheckboxLabel} ${process.env.NEXT_PUBLIC_APP_NAME}.`}
          name="optIn"
          register={register}
          updateForm={(name, value) => updateForm(name, value)}
        />
        <SignUpCheckbox
          checked={getValues().termsOfService}
          label={`${dict.registerFields.secondCheckboxLabel1}${process.env.NEXT_PUBLIC_APP_NAME}${dict.registerFields.secondCheckboxLabel2}`}
          name="termsOfService"
          register={register}
          updateForm={(name, value) => updateForm(name, value)}
          errors={errors}
        />
      </div>
    </Form>
  );
}
