import * as Yup from "yup";
import { useLanguageDictionary } from "@shared-hooks";

const emailCodeValidation = () => {
  const dict = useLanguageDictionary();

  return {
    schema: Yup.object().shape({
      code: Yup.string()
        .required(dict["2fa"].formErrorMessage.emailCode)
        .min(6, dict["2fa"].formErrorMessage.emailCode)
        .max(6, dict["2fa"].formErrorMessage.emailCode),
    }),
    initialValues: { code: "" },
  };
};

export default emailCodeValidation;
