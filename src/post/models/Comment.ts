import { Entity } from "src/shared/types/Entity"
import { Profile } from "src/user/models/profile"
import { Post } from "./Post"

export type PostComment = {
  text: string,
  profile: Profile,
}