import { useState } from "react";
import Form from "./form";
import { useRouter } from "next/router";

import { Input } from "@shared-components/inputs";
import { InputContainer } from "@shared-components/input-container";
import { Credentials } from "@shared-types";
import { useLanguageDictionary } from "@shared-hooks";

interface LoginFormProps {
  onSubmit: (e: Credentials) => void;
}

export default function LoginForm(props: LoginFormProps) {
  const dict = useLanguageDictionary();
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const router = useRouter();

  return (
    <Form
      buttonWidth={window.innerWidth < 768 ? 768 : 250}
      onSubmit={() => props.onSubmit({ email, password })}
      submitLabel={dict.loginFields.login}
      className="flex flex-col items-center"
    >
      <InputContainer className="flex w-full">
        <Input
          label={dict.loginFields.email}
          placeholder={dict.loginFields.email}
          name="email"
          onChange={setEmail}
          required={true}
        />
      </InputContainer>
      <InputContainer className="flex w-full">
        <Input
          label={dict.loginFields.password}
          name="password"
          type="password"
          placeholder={dict.loginFields.password}
          onChange={setPassword}
          minlength={8}
          required={true}
          icon={true}
        />
        <div className="flex items-center justify-end h-[31px] text-sm">
          <small
            className="text-sm text-gold font-normal cursor-pointer col-span-1 justify-self-end"
            onClick={() => router.push("/forgot-password")}
          >
            {dict.loginFields.forgotPassword}
          </small>
        </div>
      </InputContainer>
    </Form>
  );
}
