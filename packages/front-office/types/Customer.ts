export type Customer = {
  id: number;
  name: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  isCompany: boolean;
  vatId?: string;
  registryId?: string;
};
