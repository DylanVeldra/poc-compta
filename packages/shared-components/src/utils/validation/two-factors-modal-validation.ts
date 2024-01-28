import * as Yup from "yup";
import { useLanguageDictionary } from "@shared-hooks";

const twoFactorsModalValidation = () => {
  const dict = useLanguageDictionary();

  return {
    schema: Yup.object().shape({
      twoFactorToken: Yup.string()
        .required(dict["2fa"].formErrorMessage.twoFactorToken)
        .min(6, dict["2fa"].formErrorMessage.twoFactorToken)
        .max(6, dict["2fa"].formErrorMessage.twoFactorToken),
      emailCode: Yup.string()
        .required(dict["2fa"].formErrorMessage.emailCode)
        .min(6, dict["2fa"].formErrorMessage.emailCode)
        .max(6, dict["2fa"].formErrorMessage.emailCode),
    }),
    initialValues: {
      twoFactorToken: "",
      emailCode: "",
      email: "",
      password: "",
    },
  };
};

export default twoFactorsModalValidation;
