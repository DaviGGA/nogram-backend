import { UserContext } from "src/shared/types/UserContext";
import { AppDataSource } from "../../shared/db/datasource";
import { CommentEntity } from "../entities/comment-entity";
import { PostComment } from "../models/Comment";
import { Profile } from "src/user/models/profile";

const commentRepository = AppDataSource.getRepository(CommentEntity);

function toDomain(comment: CommentEntity): PostComment {
  const {user, ...rest} = comment;
  return {...rest, profile: user.profile as Profile}
}

export async function createComment(text: string, userContext: UserContext, postId: number): Promise<PostComment> {
  const newComment = await commentRepository.save({
    text, 
    user: {id: userContext.id}, 
    post: {id: postId}
  })
  return toDomain(newComment);
}



