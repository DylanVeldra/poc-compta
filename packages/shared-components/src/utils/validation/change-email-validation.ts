import * as Yup from "yup";
import { useLanguageDictionary } from "@shared-hooks";

const changeEmailValidation = () => {
  const dict = useLanguageDictionary();

  return {
    schema: Yup.object().shape({
      email: Yup.string()
        .required(dict.registerFields.formErrorMessage.email.required)
        .email(dict.registerFields.formErrorMessage.email.notValid),
    }),
    initialValues: { email: "" },
  };
};

export default changeEmailValidation;
