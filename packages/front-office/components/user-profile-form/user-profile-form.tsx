import { useState, useEffect } from "react";

// Types
import { UpdateProfile } from "@shared-types";

// Helpers
import { useLanguageDictionary } from "@shared-hooks";

// Components
import { Form } from "@shared-components/forms";
import {
  CountryList,
  DatePicker,
  PhoneInput,
  Input,
} from "@shared-components/inputs";
import { fetchJSON } from "@shared-utils";

import { InputContainer } from "@shared-components/input-container";

interface UserProfileProps {
  onSubmit: (user: UpdateProfile) => void;
  subtitle: string;
}

const UserProfileForm = (props: UserProfileProps) => {
  const dict = useLanguageDictionary();
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthdate] = useState(new Date());
  const [taxResidenceCountry, setTaxResidenceCountry] = useState("");
  const [telegramAccount, setTelegramAccount] = useState("");

  useEffect(() => {
    fetchJSON("/user").then((res) => {
      setEmail(res.body.email);
      setFirstname(res.body.firstname);
      setLastname(res.body.lastname);
      setPhoneNumber(res.body.phoneNumber);
      setBirthdate(res.body.birthDate);
      setTaxResidenceCountry(res.body.taxResidenceCountry);
      setTelegramAccount(res.body.telegramAccount);
    });
  }, [
    setEmail,
    setBirthdate,
    setFirstname,
    setLastname,
    setTelegramAccount,
    setTaxResidenceCountry,
  ]);

  const onSubmit = () => {
    props.onSubmit({
      email,
      firstname,
      lastname,
      phoneNumber,
      birthDate,
      taxResidenceCountry,
      telegramAccount,
    });
  };

  return (
    <Form
      onSubmit={onSubmit}
      submitLabel={dict.accountManagement.dashboard.update}
      buttonWidth={300}
      noButton={true}
    >
      <h5 className="mt-16 mb-8">{props.subtitle}</h5>
      <InputContainer className="grid-cols-2 gap-lg">
        <Input
          label={dict.registerFields.firstname}
          name="firstname"
          placeholder="John"
          onChange={(v: string) => setFirstname(v)}
          required={true}
          value={firstname}
          disabled
        />
        <Input
          label={dict.registerFields.lastname}
          name="lastname"
          placeholder="Doe"
          onChange={(v: string) => setLastname(v)}
          required={true}
          value={lastname}
          disabled
        />
      </InputContainer>
      <InputContainer className="grid-cols-2 gap-lg">
        <DatePicker
          label={dict.registerFields.birthDate}
          onChange={setBirthdate}
          currentBirthDate={new Date(birthDate)}
          disabled
        />
        <CountryList
          onChange={setTaxResidenceCountry}
          label={dict.registerFields.country}
          currentValue={taxResidenceCountry}
          disabled
          values={{}}
          errors={{}}
        />
      </InputContainer>
      <InputContainer className="grid-cols-2 gap-lg">
        <PhoneInput
          label={dict.registerFields.phoneNumber}
          name="phoneNumber"
          onChange={setPhoneNumber as any}
          currentValue={phoneNumber.split(" ")[0]}
          value={phoneNumber.split(" ").slice(1).join("")}
          disabled
          values={{}}
          errors={{}}
        />
        <Input
          label={dict.registerFields.telegram}
          name="telegram"
          placeholder={dict.registerFields.telegram}
          onChange={(v: string) => setTelegramAccount(v)}
          value={telegramAccount}
          disabled
        />
      </InputContainer>
      <InputContainer className="grid-cols-1">
        <Input
          type="email"
          label="Email"
          name="email"
          placeholder="example@company.com"
          onChange={(v: string) => setEmail(v)}
          required={true}
          maxlength={256}
          value={email}
          disabled
        />
      </InputContainer>
    </Form>
  );
};

export default UserProfileForm;
