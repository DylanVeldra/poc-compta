import { useState, useEffect, useRef } from "react";
import { StepContainer } from "@shared-components/step-component";
import DownloadGoogleAuthentificator from "./download-google-authentificator";
import ScanQRCode from "./scan-qr-code";
import { useLanguageDictionary } from "@shared-hooks";
import { GoogleAuthenticatorInput } from "@shared-components/inputs";
import { GoogleAuthenticatorContainer } from "@shared-components/google-authenticator-container";

interface TwoFactorAuthFormProps {
  onSubmit: (code: string) => void;
  oauthCode: string;
  isCodeValid: boolean;
  secretKey: string;
  isSubmitting: boolean;
}
export default function TwoFactorAuthForm(props: TwoFactorAuthFormProps) {
  const [code, setCode] = useState("");
  const [secret, setSecret] = useState("");
  const dict = useLanguageDictionary();
  const secretKeyRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.isCodeValid) {
      if (secretKeyRef.current) {
        secretKeyRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [props.isCodeValid]);

  useEffect(() => {
    try {
      const urlParams = new URL(props.oauthCode).search;

      setSecret(new URLSearchParams(urlParams).get("secret"));
    } catch {}
  });

  return (
    <>
      <StepContainer step={1} title={dict["2fa"].downloadApp} inline>
        <DownloadGoogleAuthentificator />
      </StepContainer>
      <StepContainer step={2} title={dict["2fa"].scanQRCode}>
        <ScanQRCode code={props.oauthCode} secret={secret} />
      </StepContainer>
      <StepContainer step={3} title={dict["2fa"].enterCode}>
        <GoogleAuthenticatorContainer
          value={code}
          label={dict["2fa"].reportProblem}
          marginBottom={53}
          inline
        >
          <GoogleAuthenticatorInput
            name="googleAuthentificatorCode"
            placeholder="XXXXXX"
            maxlength={6}
            minlength={6}
            onChange={setCode}
            type="number"
            required
            marginTop={31}
            isCodeComplete={code.length === 6}
            isSubmitting={props.isSubmitting}
            isValid={props.isCodeValid ? true : false}
            onSubmit={() => props.onSubmit(code)}
          />
        </GoogleAuthenticatorContainer>
      </StepContainer>
      {props.isCodeValid ? (
        <StepContainer step={4} title={dict["2fa"].saveSecretKey}>
          <p
            ref={secretKeyRef}
            className="border border-gold rounded-md rounded py-2 px-4 text-xl mt-lg mb-[8px] break-words leading-7 text-center w-9/12 mx-auto max-w-[427px]"
          >
            {props.secretKey}
          </p>
        </StepContainer>
      ) : (
        ""
      )}
    </>
  );
}
