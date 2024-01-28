export interface CountryListDto {
  name: string;
  native: string;
  phone: string;
  continent: Continent;
  capital: string;
  currency: string;
  languages: string[];
  emoji: string;
  emojiU: string;
}

export enum Continent {
  AF = "AF",
  An = "AN",
  As = "AS",
  Eu = "EU",
  Na = "NA",
  Oc = "OC",
  Sa = "SA",
}
