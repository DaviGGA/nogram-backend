import { UserContext } from "src/shared/types/UserContext";
import * as likeRepository from "../repositories/like-repository";
import { Entity } from "src/shared/types/Entity";
import { Like } from "../models/Like";

type IsLiked = boolean;
export async function likePost(postId: number, userContext: UserContext): Promise<IsLiked> {

  const alrealdyLiked = await likeRepository.findLikeByPostUser(postId, userContext.id) as Entity<Like>;

  if (alrealdyLiked) {
    await likeRepository.deleteLike(alrealdyLiked.id);
    return false
  }

  await likeRepository.createLike(postId, userContext);
  return true
}




