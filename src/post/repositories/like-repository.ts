import { UserContext } from "src/shared/types/UserContext";
import { AppDataSource } from "../../shared/db/datasource";
import { LikeEntity } from "../entities/like-entity";
import { Like } from "../models/Like";

const likeRepository = AppDataSource.getRepository(LikeEntity);

function toDomain(like: LikeEntity): Like {
  return like as Like
}

export async function createLike(postId: number, userContext: UserContext): Promise<Like> {
  const newLike = await likeRepository.save(
    {post: {id: postId}, liking_user: userContext}
  );
  return toDomain(newLike);
}

export async function deleteLike(id: number): Promise<void> {
  await likeRepository.delete({id})
}

export async function findLikeByPostUser(postId: number, userId: number) {
  const foundLike = await likeRepository.findOne({
    where: {
      post: {id: postId},
      liking_user: {id: userId}
    }
  })
  return foundLike ? toDomain(foundLike) : null;
}


