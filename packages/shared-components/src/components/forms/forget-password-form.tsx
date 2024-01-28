import { ChangeEventHandler, ChangeEvent, useState } from "react";
import Form from "./form";
import { useRouter } from "next/router";

import { Input } from "@shared-components/inputs";
import { InputContainer } from "@shared-components/input-container";
import { useLanguageDictionary } from "@shared-hooks";

interface ResetPasswordFormProps {
  onSubmit: (email: string) => void;
}

export default function ForgotPasswordForm(props: ResetPasswordFormProps) {
  const dict = useLanguageDictionary();
  const [email, setEmail] = useState<any>("");

  return (
    <Form
      buttonWidth={250}
      onSubmit={() => props.onSubmit(email)}
      submitLabel={dict.validate}
      className="flex flex-col items-center"
      buttonStyle="mt-12"
    >
      <InputContainer className="flex w-full">
        <Input label={dict.loginFields.email} placeholder={dict.loginFields.email} name="email" onChange={setEmail} required={true} />
      </InputContainer>
    </Form>
  );
}
