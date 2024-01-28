import * as Yup from "yup"
import { useLanguageDictionary } from "@shared-hooks"

const emailRegex =
  /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/

const signUpValidation = () => {
  const dict = useLanguageDictionary()

  return {
    schema: Yup.object().shape({
      email: Yup.string()
        .trim()
        .matches(
          emailRegex,
          dict.registerFields.formErrorMessage.email.notValid
        )
        .required(dict.registerFields.formErrorMessage.email.required),
      firstname: Yup.string()
        .trim()
        .required(dict.registerFields.formErrorMessage.firstname.required)
        .min(2, dict.registerFields.formErrorMessage.firstname.minLength)
        .max(40, dict.registerFields.formErrorMessage.firstname.maxLength),
      lastname: Yup.string()
        .trim()
        .required(dict.registerFields.formErrorMessage.lastname.required)
        .min(2, dict.registerFields.formErrorMessage.lastname.minLength)
        .max(40, dict.registerFields.formErrorMessage.lastname.maxLength),
      birthDay: Yup.string().test(function (value) {
        if (!value) {
          return this.createError({
            message: dict.registerFields.formErrorMessage.required,
          })
        } else {
          return true
        }
      }),
      birthMonth: Yup.string().test(function (value) {
        if (!value) {
          return this.createError({
            message: dict.registerFields.formErrorMessage.required,
          })
        } else {
          return true
        }
      }),
      birthYear: Yup.string().test(function (value) {
        if (!value) {
          return this.createError({
            message: dict.registerFields.formErrorMessage.required,
          })
        } else {
          return true
        }
      }),
      prefix: Yup.string().test(function (value) {
        if (!value) {
          return this.createError({
            message: dict.registerFields.formErrorMessage.required,
          })
        } else {
          return true
        }
      }),
      phoneNumber: Yup.string()
        .required(dict.registerFields.formErrorMessage.required)
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          dict.registerFields.formErrorMessage.phoneNumber.wrongPhoneNumber
        ),
      password: Yup.string()
        .required(dict.registerFields.formErrorMessage.password.required)
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          dict.registerFields.formErrorMessage.password.other
        ),
      confirmPassword: Yup.string().test(
        "match",
        dict.registerFields.passwordMatchLabel,
        function (passwordConfirm) {
          return passwordConfirm === this.parent.password
        }
      ),
      termsOfService: Yup.boolean()
        .required(dict.registerFields.formErrorMessage.checkbox)
        .oneOf([true], dict.registerFields.formErrorMessage.checkbox),
    }),
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      birthDay: "",
      birthMonth: "",
      birthYear: "",
      taxResidenceCountry: "",
      phoneNumber: "",
      telegramAccount: "",
      password: "",
      confirmPassword: "",
      prefix: "",
      optIn: false,
      termsOfService: false,
    },
  }
}

export default signUpValidation
