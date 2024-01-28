import { useState } from "react";
import { ReactHookInput } from "@shared-components/inputs";
import DropList from "./drop-list";
import countryList from "countries-list/dist/countries.emoji.json";
import { useLanguageDictionary } from "@shared-hooks";

import { Flag } from "../flag";

const generatePrefixes = () => {
  let array: Array<any> = [];

  // Replace is mandatory, because we have commas in phone numbers and we need to remove them
  let arrayOfCountriesSorted = Object.entries(countryList).sort(
    (a, b) => Number(a[1].phone.replace(/,/g, "")) - Number(b[1].phone.replace(/,/g, ""))
  );

  arrayOfCountriesSorted.forEach((country: any) => {
    if (country[0] === "FR") {
      array.push(country);
      let index = arrayOfCountriesSorted.indexOf(country);
      arrayOfCountriesSorted.splice(index, 1);
    }
    if (country[0] === "CH") {
      array.unshift(country);
      let index = arrayOfCountriesSorted.indexOf(country);
      arrayOfCountriesSorted.splice(index, 1);
    }
  });

  const newArray = array.concat(arrayOfCountriesSorted);

  return newArray.map((item) => {
    return {
      value: "+" + item[1].phone,
      label: (
        <div className="flex items-center gap-[5px]">
          <Flag countryCode={item[0]} /> <div>+{item[1].phone}</div>
        </div>
      ),
    };
  });
};

export interface FormikActions<Values> {}

interface PhoneInputProps {
  label: string;
  name: string;
  value?: string;
  currentValue?: string;
  onChange?: (v: string | number) => void;
  updateForm?: (v: string, x: string) => void;
  disabled?: boolean;
  errors: any;
  register?: any;
  values?: any;
  trigger?: any;
}

export default function PhoneInput(props: PhoneInputProps) {
  const dict = useLanguageDictionary();
  const [value, setValue] = useState(props.value || "");
  const [prefix, setPrefix] = useState("" || props.currentValue);
  const prefixes = generatePrefixes();

  const onInputChange = (name: string, value: string) => {
    setValue(value);
    if (props.updateForm) {
      props.updateForm(name, value);
    }
  };
  const onPrefixChange = (v: string) => {
    if (!v) return;

    setPrefix(v);
    if (props.updateForm) {
      props.updateForm("prefix", v);
      // Check again prefix value
      props?.trigger("prefix");
    }
  };

  const checkPrefixValue = () => {
    // Triggers an error if the user did not select a prefix value beforehand
    if (!prefix) {
      props?.trigger("prefix");
    }
  };

  return (
    <div className="text-md">
      <p className="block font-medium text-fake-black dark:text-white">{props.label}</p>
      <div className="flex justify-between">
        <div className="w-48 pr-2.5">
          <DropList
            placeholder={dict.registerFields.phoneExtension}
            name="prefix"
            list={prefixes}
            defaultValue={prefix}
            onChange={onPrefixChange}
            currentValue={props.currentValue}
            disabled={props.disabled}
            errors={props.errors}
            searchInput={true}
            filterKey={"value"}
          />
        </div>
        <ReactHookInput
          label=""
          placeholder={dict.registerFields.phoneNumber}
          name="phoneNumber"
          type="text"
          updateForm={(name, value) => onInputChange(name, value)}
          register={props.register}
          required={true}
          errors={props.errors}
          onBlur={checkPrefixValue}
          errorMessage={props.errors.phoneNumber}
          errorIcon={false}
        />
      </div>
    </div>
  );
}
