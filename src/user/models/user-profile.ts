import { Profile } from "./profile";
import { User } from "./user"

export type UserProfile = Profile & {
  user: User
};