import { TagDto } from "./TagDto";
import { User } from "./User";

export interface TagsOnUsersDto {
  tag?: TagDto[];
  tagId?: number;
  user?: User[];
  userId?: number;
}
