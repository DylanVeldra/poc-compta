import { TokenType } from '@auth/auth.service';
import { USER_ROLE, USER_STATUS } from '@prisma/client';

export type UserInContext = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  twoFactorVerified: boolean;
  emailVerified: boolean;
  role: USER_ROLE;
  status: USER_STATUS;
};

export type AccessToken = {
  exp: number;
  iat: number;
  tokenType: TokenType;
  twoFactorLogged: boolean;
  emailLogged: boolean;
  // User data
  user: UserInContext;
  companyId: number;
};

export type RefreshToken = {
  exp: number;
  iat: number;
  tokenType: TokenType;
  twoFactorLogged: boolean;
  emailLogged: boolean;
  user: {
    id: number;
    role: USER_ROLE;
    status: USER_STATUS;
  };
};
