import { TagDto } from './TagDto';

/**
 * Pas un super nom mais c'est le type d'une ligne comprenant toutes les colonnes (attributs) possible théoriquement du tableau UserTable
 */
export interface UserRow {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  feePercent: number;
  registerDate: Date | string;
  status: string;
  emailVerified: boolean;
  twoFactorVerified: boolean;
  originalAddressToken: string;
  tags: TagDto[];
}
