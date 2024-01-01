export type SaltEdgeResponse<T> = {
  data: T;
  meta: {
    next_id: string | null;
    next_page: string | null;
  };
};

export type SaltEdgeCustomer = {
  id: string;

  /**
   * Company-Name_id
   */
  identifier: string;

  secret: string;

  /**
   *  Date String ISO format
   */
  updated_at: string;

  /**
   *  Date String ISO format
   */
  created_at: string;
};

export enum SALT_EDGE_CONNECTION_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DISABLED = 'disabled',
}

export enum SALT_EDGE_CATEGORIZATION {
  NONE = 'none',
  PERSONAL = 'personal',
  BUSINESS = 'business',
}

export type SaltEdgeConnection = {
  id: string;
  secret: string;
  provider_id: string;
  provider_code: string;
  provider_name: string;
  customer_id: string;
  /**
   * Date String ISO format
   */
  next_refresh_possible_at: string;
  /**
   * Date String ISO format
   */
  created_at: string;
  /**
   * Date String ISO format
   */
  updated_at: string;

  status: SALT_EDGE_CONNECTION_STATUS;
  categorization: SALT_EDGE_CATEGORIZATION;
  daily_refresh: boolean;
  store_credentials: boolean;

  /**
   * see country code here https://docs.saltedge.com/account_information/v5/#countries
   */
  country_code: string;

  /**
   * Date String ISO format
   */
  last_success_at: string;
  show_consent_confirmation: boolean;
  last_consent_id: string;
  last_attempt?: unknown;
};

export enum SALT_EDGE_ACCOUNT_NATURE {
  ACCOUNT = 'account',
  BONUS = 'bonus',
  CARD = 'card',
  CHECKING = 'checking',
  CREDIT = 'credit',
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  EWALLET = 'ewallet',
  INSURANCE = 'insurance',
  INVESTMENT = 'investment',
  LOAN = 'loan',
  MORTGAGE = 'mortgage',
  SAGINGS = 'savings',
}

export type SaltEdgeAccount = {
  id: string;
  connection_id: string;
  name: string;
  nature: SALT_EDGE_ACCOUNT_NATURE;
  balance: number;
  /**
   * See https://docs.saltedge.com/account_information/v5/#currencies
   */
  currency_code: string;
  /**
   * Do not use it since it's not predictable and is specific to the bank/account
   */
  extra: unknown;
  created_at: string;
  updated_at: string;
};

export enum SALT_EDGE_TRANSACTION_MODE {
  NORMAL = 'normal',
  FEE = 'fee',
  TRANSFER = 'transfer',
}

export enum SALT_EDGE_TRANSACTION_STATUS {
  POSTED = 'posted',
  PENDING = 'pending',
}

export type SaltEdgeTransaction = {
  id: string;
  account_id: string;
  duplicated: boolean;
  mode: SALT_EDGE_TRANSACTION_MODE;
  status: SALT_EDGE_TRANSACTION_STATUS;

  /**
   * Date string YYYY-MM-DD format
   */
  made_on: string;
  amount: number;

  /**
   * See https://docs.saltedge.com/account_information/v5/#currencies
   */
  currency_code: string;
  description: string;
  /**
   * Do not use it since it's not predictable and is specific to the bank/account
   */
  category: string;
  /**
   * Do not use it since it's not predictable and is specific to the bank/account
   */
  extra: unknown;
  /**
   * Date String ISO format
   */
  created_at: string;
  /**
   * Date String ISO format
   */
  updated_at: string;
};
