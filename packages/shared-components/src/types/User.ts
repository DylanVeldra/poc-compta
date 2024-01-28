import { RegisterCredentials, TagsOnUsersDto } from "@shared-types"

export interface User extends RegisterCredentials {
  id: number
  tokenType: number
  emailVerified: boolean
  twoFactorVerified: boolean
  emailLogged: boolean
  twoFactorLogged: boolean
  iat: number
  exp: number
  role: string
  email: string
  status: "REGISTRATION_IN_PROGRESS" | "ALLOWED" | "BANNED"
  address: string
  feePercent: number
  tags?: TagsOnUsersDto
}
