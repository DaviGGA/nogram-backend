import { UserContext } from "src/shared/types/UserContext";
import { FeedPost } from "../models/FeedPost";

export function isLiked(
  post: Omit<FeedPost,"is_liked">, 
  userContext: UserContext
): boolean {
  return post.likes
    .some(like => like.liking_user.email === userContext.email)
}