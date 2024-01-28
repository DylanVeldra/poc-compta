import { Credentials } from "@shared-types"

export interface RegisterCredentials extends Credentials {
  firstname: string
  lastname: string
  phoneNumber: string
  birthDate: Date | string
  optIn?: boolean
  termsOfService?: boolean
}
