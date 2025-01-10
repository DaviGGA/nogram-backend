import { UserContext } from "src/shared/types/UserContext";
import * as commentRepository from "../repositories/comment-repository"

export async function commentPost(text: string, userContext: UserContext ,postId: number) {
  return await commentRepository.createComment(text, userContext, postId);
}