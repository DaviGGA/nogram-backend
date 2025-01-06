import { User } from "../../user/models/user"
import { Post } from "./Post"

export type Like = {
  liking_user: Omit<User, "password">,
  post: Post
}