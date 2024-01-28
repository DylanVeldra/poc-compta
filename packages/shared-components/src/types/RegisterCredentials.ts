import { Credentials } from '@shared-types';

export interface RegisterCredentials extends Credentials {
  firstname: string;
  lastname: string;
  phoneNumber: string;
  birthDate: Date | string;
  taxResidenceCountry: string;
  telegramAccount?: string;
  optIn?: boolean;
  termsOfService?: boolean;
}
