import { UserInContext, USER_ROLE, USER_STATUS } from "./user"

export enum TokenType {
  ACCESS = "ACCESS",
  REFRESH = "REFRESH",
}

export type AccessToken = {
  exp: number
  iat: number
  tokenType: TokenType
  twoFactorLogged: boolean
  emailLogged: boolean
  // User data
  user: UserInContext
  companyId: number
}

export type RefreshToken = {
  exp: number
  iat: number
  tokenType: TokenType
  twoFactorLogged: boolean
  emailLogged: boolean
  user: {
    id: number
    role: USER_ROLE
    status: USER_STATUS
  }
}
