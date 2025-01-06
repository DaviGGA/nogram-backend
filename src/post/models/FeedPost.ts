import { Profile } from "src/user/models/profile";
import { Post } from "./Post";
import { User } from "src/user/models/user";

export type FeedPost = Post & {
  user: Pick<User, "email">
  profile: Profile,
  is_liked: boolean
}