import { useLanguageDictionary } from '@shared-hooks';
import { Icon } from '@shared-components/icon';
import { Divider } from '@shared-components/divider';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { fetchJSON } from '@shared-utils';
import { Customer } from 'types/Customer';
import { FieldPathValue, Path, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomerValidation } from './customerValidation';
import { InputContainer } from '@shared-components/input-container';
import { Checkbox, ReactHookInput } from '@shared-components/inputs';
import { Form } from '@shared-components/forms';
import { ToastGenerator } from '@shared-components/toast-generator';

type CustomerFormSidePanelProps = {
  customer: Partial<Customer> | null;
  onClose: () => void;
};

export function CustomerFormSidePanel(props: CustomerFormSidePanelProps) {
  const dict = useLanguageDictionary();
  const [animationStart, setAnimationStart] = useState(692);
  const [animationOffset, setAnimationOffset] = useState(0);
  const [curCustomer, setCurCustomer] = useState<Partial<Customer>>({})
  const toastRef = useRef<any>();

  const {
    trigger,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(CustomerValidation().schema),
    defaultValues: CustomerValidation().initialValues,
    mode: "onBlur",
  });

  const onChange = <T extends Path<typeof register>>(v: T, x: FieldPathValue<typeof register, T>) => {
    setValue(v, x)
    setCurCustomer(getValues())
  }

  const onSubmitHandler = () => {
    const values = getValues();
    fetchJSON("/customers", "POST", values)
      .then(() => {
        handleClose()
        //TODO actualise()
      })
      .catch((reason) => {
        if (reason.i18n) {
          let errorMessage = dict.i18nServerErrors?.[reason.i18n] || dict.i18nServerErrors.INTERNAL_SERVER_ERROR;
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


  const handleClose = () => {
    setAnimationStart(0);
    setAnimationOffset(692);
    setTimeout(() => {
      props.onClose();
      setAnimationStart(692);
      setAnimationOffset(0);
      setCurCustomer({})
      reset()
    }, 500);
  };

  useEffect(() => {
    if (!props.customer) {
      return;
    }
  }, [props.customer]);


  return (
    <>
      {props.customer ? (
        <>
          <ToastGenerator ref={toastRef} />
          <div
            onClick={handleClose}
            className="bg-black bg-opacity-60 fixed top-0 right-0 left-0 z-30 md:inset-0 h-modal w-full h-full"
          ></div>
          <motion.div
            initial={{ x: animationStart }}
            animate={{ x: animationOffset }}
            transition={{ duration: 0.5 }}
            className="flex flex-col bg-fake-white dark:bg-fake-black fixed right-0 top-0 bottom-0 z-40 w-full sm:w-2/3 lg:w-2/5"
          >
            <div className="px-[30px] bg-white dark:bg-dark-gray flex items-center h-[82px]">
              <div className="text-lg font-semibold flex-1">
                {'dict.history.operationDetail'}
              </div>
              <div onClick={handleClose} className="cursor-pointer">
                <Icon className="text-2xl" src="bs-cross" />
              </div>
            </div>
            <Divider className="bg-gradient-to-r from-gold h-[2px]" />
            <div className="px-[30px]">
                  <Form
                    onSubmit={handleSubmit(onSubmitHandler)}
                    submitLabel={dict.registerFields.register}
                    buttonStyle="mt-[61px]"
                    buttonWidth={250}
                  >
                    <InputContainer
                      noMargin={true}
                      className="grid-cols-1 gap-[40px] mb-[40px]"
                    >
                    <ReactHookInput
                      label={dict.customer.form.name.label}
                      placeholder={dict.customer.form.name.placeholder}
                      name="name"
                      updateForm={onChange}
                      register={register}
                      errors={errors}
                      errorIcon={errors.name ? true : false}
                    />
                    </InputContainer>
                    <InputContainer
                      noMargin={true}
                      className="grid-cols-1 gap-[40px] mb-[40px]"
                    >
                      <ReactHookInput
                        label={dict.customer.form.street.label}
                        placeholder={dict.customer.form.street.placeholder}
                        name="street"
                        updateForm={setValue}
                        register={register}
                        errors={errors}
                        errorIcon={errors.street ? true : false}
                      />
                    </InputContainer>
                    <InputContainer noMargin={true} className="grid-cols-3 gap-6 mb-[40px]">
                      <ReactHookInput
                        label={dict.customer.form.postalCode.label}
                        placeholder={dict.customer.form.postalCode.placeholder}
                        name="postalCode"
                        updateForm={onChange}
                        register={register}
                        errors={errors}
                        errorIcon={errors.postalCode ? true : false}
                      />
                      <ReactHookInput
                        label={dict.customer.form.city.label}
                        placeholder={dict.customer.form.city.placeholder}
                        name="city"
                        updateForm={onChange}
                        register={register}
                        errors={errors}
                        errorIcon={errors.city ? true : false}
                      />
                      <ReactHookInput
                        label={dict.customer.form.country.label}
                        placeholder={dict.customer.form.country.placeholder}
                        name="country"
                        updateForm={onChange}
                        register={register}
                        errors={errors}
                        errorIcon={errors.country ? true : false}
                      />
                    </InputContainer>

                    <InputContainer noMargin={true} className="grid-cols-1 gap-6 mb-[40px]">
              {/* todo add trigger to check registryId */}
                      <Checkbox
                        label={dict.customer.form.isCompany.label}
                        name="isCompany"
                        register={register}
                        updateForm={onChange}
                      />
                    </InputContainer>
                      {curCustomer.isCompany ? 
                      <>
                        <ReactHookInput
                          label={dict.customer.form.vatId.label}
                          placeholder={dict.customer.form.vatId.placeholder}
                          name="vatId"
                          updateForm={onChange}
                          register={register}
                          errors={errors}
                          errorIcon={errors.vatId ? true : false}
                        />
                        <ReactHookInput
                          label={dict.customer.form.registryId.label}
                          placeholder={dict.customer.form.registryId.placeholder}
                          name="registryId"
                          updateForm={onChange}
                          register={register}
                          errors={errors}
                          errorIcon={errors.registryId ? true : false}
                        />
                      </>
                    :
                    <>
                    </>
                    }
                  </Form>
            </div>
          </motion.div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
