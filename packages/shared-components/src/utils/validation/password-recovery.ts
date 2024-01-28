import * as Yup from "yup";
import { useLanguageDictionary } from "@shared-hooks";

const passwordRecovery = () => {
  const dict = useLanguageDictionary();

  return {
    schema: Yup.object().shape({
      password: Yup.string()
        .required(dict.registerFields.formErrorMessage.password.required)
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, dict.registerFields.formErrorMessage.password.other),
      confirmPassword: Yup.string().test("match", dict.registerFields.passwordMatchLabel, function (passwordConfirm) {
        return passwordConfirm === this.parent.password;
      }),
    }),
    initialValues: {
      password: "",
      confirmPassword: "",
    },
  };
};

export default passwordRecovery;
