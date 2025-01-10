import { PostComment } from "./Comment"
import { Like } from "./Like"

export type Post = {
  image: string,
  description: string | undefined,
  likes: Omit<Like, "post">[],
  comments: PostComment[]
}