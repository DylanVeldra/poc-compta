export interface FeesDto {
  id: number;
  userId: number;
  date: string;
  amount: number;
  publicId: string;
  createdAt?: string;
  updatedAt?: string;
  editedByAdmin?: boolean;
}
