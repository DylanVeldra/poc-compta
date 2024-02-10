import * as Yup from "yup";
import { useLanguageDictionary } from "@shared-hooks";

export const CustomerValidation = () => {
  const dict = useLanguageDictionary();

  return {
    schema: Yup.object().shape({
      name: Yup.string().required(dict.customer.form.name.required),
      street: Yup.string().required(dict.customer.form.street.required),
      postalCode: Yup.string().required(dict.customer.form.postalCode.required),
      city: Yup.string().required(dict.customer.form.city.required),
      country: Yup.string().required(dict.customer.form.country.required),
      isCompany: Yup.boolean().default(false),
      vatId: Yup.string(),
      registryId: Yup.string().test(
        "match",
        dict.customer.form.registryId.required,
        function (registryId) {
          return (
            (registryId && this.parent.isCompany) || !this.parent.isCompany
          );
        }
      ),
    }),
    initialValues: {
      name: "",
      street: "",
      postalCode: "",
      city: "",
      country: "",
      isCompany: false,
      vatId: undefined,
      registryId: undefined,
    },
  };
};
