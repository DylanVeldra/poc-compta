import { Form } from "@shared-components/forms";
import { Input } from "@shared-components/inputs";
import { useLanguageDictionary } from "@shared-hooks";
import { LinkButton } from "@shared-components/buttons";

interface EmailVerificationFormProps {
  onSubmit: () => void;
  onClickOnSendCodeAgain: () => void;
  emailRequested?: boolean;
  timer?: number;
  errorMessage?: any;
  onChange: (v: any) => void;
  updateForm?: (v: any) => void;
  value?: string;
}

export default function EmailVerificationForm(
  props: EmailVerificationFormProps
) {
  const dict = useLanguageDictionary();

  return (
    <Form
      onSubmit={props.onSubmit}
      submitLabel={dict.validate}
      marginTop={94}
      buttonWidth={250}
    >
      <div className="mt-[100px] w-full">
        <Input
          label={dict.checkEmail.verificationCode}
          name="code"
          placeholder="XXXXXX"
          maxlength={6}
          minlength={6}
          updateForm={props.updateForm}
          onChange={props.onChange}
          value={props.value}
          errorMessage={props.errorMessage}
        />
        <p className="flex flex-col lg:flex-row items-end justify-end text-sm font-sm text-right pr-1 mt-1">
          <span className="lg:mr-1">
            {dict.checkEmail.mailNotReceived + " "}
          </span>
          <LinkButton
            label={
              props.emailRequested
                ? dict.checkEmail.sendCodeAgainIn +
                  ` ${60 - props.timer} ` +
                  dict.checkEmail.sendCodeAgainTime
                : dict.checkEmail.sendCodeAgain
            }
            onClick={props.onClickOnSendCodeAgain}
            disabled={props.emailRequested ? true : false}
          />
        </p>
      </div>
    </Form>
  );
}
