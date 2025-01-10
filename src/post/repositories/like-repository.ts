import { UserContext } from "src/shared/types/UserContext";
import { AppDataSource } from "../../shared/db/datasource";
import { LikeEntity } from "../entities/like-entity";
import { Like } from "../models/Like";
import { Profile } from "src/user/models/profile";

const likeRepository = AppDataSource.getRepository(LikeEntity);

// function toDomain(like: LikeEntity): Like {
//   return {
//     ...like,
//     post: {
//       ...like.post,
//       comments: like.post.comments.map(comment => ({
//         ...comment,
//         profile: comment.user.profile as Profile
//       }))
//     }
//   } as Like
// }

export async function createLike(postId: number, userContext: UserContext): Promise<Omit<Like, "post">> {
  const newLike = await likeRepository.save(
    {post: {id: postId}, liking_user: userContext}
  );
  return newLike as Omit<Like, "post">;
}

export async function deleteLike(id: number): Promise<void> {
  await likeRepository.delete({id})
}

export async function findLikeByPostUser(postId: number, userId: number): Promise<Omit<Like, "post"> | null> {
  const foundLike = await likeRepository.findOne({
    where: {
      post: {id: postId},
      liking_user: {id: userId}
    }
  })
  return foundLike ? foundLike as Omit<Like, "post"> : null;
}


