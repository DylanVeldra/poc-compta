import * as Yup from "yup";
import { useLanguageDictionary } from "@shared-hooks";

export const addressFormValidator = () => {
  // TODO si l'utilisateur change de langue vérifié que les messages d'erreurs aussi (même sans refresh ssr)
  const dict = useLanguageDictionary();

  return {
    schema: Yup.object().shape({
      name: Yup.string().required(dict.address.formErrorMessage.name.required),
      protocolName: Yup.string().required(
        dict.address.formErrorMessage.protocolName.required
      ),
      token: Yup.string().required(
        dict.address.formErrorMessage.token.required
      ),
      fixedFee: Yup.number()
        .typeError(dict.address.formErrorMessage.percentFee.typeError)
        .required(dict.address.formErrorMessage.fixedFee.required)
        .test(
          "maxDigitsAfterDecimal",
          dict.address.formErrorMessage.percentFee.maxDigits,
          (number: any) => /^\d+(\.\d{1,2})?$/.test(number)
        ),
      percentFee: Yup.number()
        .typeError(dict.address.formErrorMessage.percentFee.typeError)
        .required(dict.address.formErrorMessage.percentFee.required)
        .test(
          "maxDigitsAfterDecimal",
          dict.address.formErrorMessage.percentFee.maxDigits,
          (number: any) => /^\d+(\.\d{1,2})?$/.test(number)
        ),
    }),
    initialValues: {
      name: "",
      protocolName: "",
      token: "",
      fixedFee: 0,
      percentFee: 0,
    },
  };
};

/**
 * C'est pas le meilleur mais j'ai pas trop cherché à générer le type avec Yup resolver, ça doit être possible je pense
 */
export type AddressSchemaFields =
  | "fixedFee"
  | "percentFee"
  | "protocolName"
  | "token"
  | "name";
