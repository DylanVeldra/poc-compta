export enum USER_ROLE {
  USER = "USER",
  COMPTA = "COMPTA",
  ADMIN = "ADMIN",
}

export enum USER_STATUS {
  REGISTRATION_IN_PROGRESS = "REGISTRATION_IN_PROGRESS",
  ALLOWED = "ALLOWED",
  BANNED = "BANNED",
}

export type UserInContext = {
  id: number
  firstname: string
  lastname: string
  email: string
  twoFactorVerified: boolean
  emailVerified: boolean
  role: USER_ROLE
  status: USER_STATUS
}
