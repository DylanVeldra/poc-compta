import * as Yup from "yup";
import { useLanguageDictionary } from "@shared-hooks";

const addNetworkValidation = () => {
  const dict = useLanguageDictionary() as any;

  return {
    schema: Yup.object().shape({
      name: Yup.string().required(dict.registerFields.formErrorMessage.email.required),
      protocolName: Yup.string().test(function (value) {
        if (!value) {
          return this.createError({
            message: dict.address.formErrorMessage.protocolName.required,
          });
        } else {
          return true;
        }
      }),
      token: Yup.string().test(function (value) {
        if (!value) {
          return this.createError({
            message: dict.address.formErrorMessage.token.required,
          });
        } else {
          return true;
        }
      }),
      address: Yup.string()
        .required(dict.address.formErrorMessage.address.required)
        .min(64, dict.address.formErrorMessage.address.min)
        .max(66, dict.address.formErrorMessage.address.max),
      fixedFee: Yup.number()
        .required(dict.address.formErrorMessage.fixedFee.required)
        .min(0.01, dict.address.formErrorMessage.fixedFee.min)
        .max(50000, dict.address.formErrorMessage.fixedFee.max),
      percentFee: Yup.number()
        .required(dict.address.formErrorMessage.percentFee.required)
        .min(0.01, dict.address.formErrorMessage.percentFee.min)
        .max(100, dict.address.formErrorMessage.percentFee.max),
    }),
    initialValues: {
      name: "",
      protocolName: "",
      token: "",
      address: "",
      fixedFee: 0,
      percentFee: 0,
    },
  };
};

export default addNetworkValidation;
