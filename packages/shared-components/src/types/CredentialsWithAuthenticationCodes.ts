import { Credentials } from "@shared-types";

export interface CredentialsWithAuthenticationCodes extends Credentials
{
  twoFactorToken: string;
  emailCode: string;
}
