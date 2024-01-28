import { Protocol, Token } from "@shared-types";

export interface AddressDto {
  id?: number;
  name?: string;
  protocolName: Protocol;
  token: Token;
  status?: string;
  fixedFee: number;
  percentFee: number;
}
