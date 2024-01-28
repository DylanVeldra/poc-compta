import * as Yup from "yup";
import { useLanguageDictionary } from "@shared-hooks";

const logInValidation = () => {
  const dict = useLanguageDictionary();

  return {
    schema: Yup.object().shape({
      email: Yup.string()
        .email(dict.registerFields.formErrorMessage.email.notValid)
        .required(dict.registerFields.formErrorMessage.email.required),
      password: Yup.string()
        .required(dict.registerFields.formErrorMessage.password.required)
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          dict.registerFields.formErrorMessage.password.other
        ),
    }),
    initialValues: {
      email: "",
      password: "",
    },
  };
};

export default logInValidation;
