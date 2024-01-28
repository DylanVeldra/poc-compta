import { UserInContext } from '@auth/dto/token.type';

export type NonNullableObject<T> = { [P in keyof T]: NonNullable<T[P]> };

export type RequestContext = {
  headers: Record<string, string>;
  body: Record<string, unknown>;
  query: Record<string, string>;
  params: Record<string, string>;
  url: string;
  referer: string;
  context: {
    twoFactorLogged: boolean;
    emailLogged: boolean;
    user: UserInContext;
    companyId: number;
    reqIq: string;
  };
};
