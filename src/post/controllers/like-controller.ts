import { Context } from "koa";
import { validateCreatePost } from "../validators/create-post-validator";
import * as likeService from "../services/like-service";
import { UserContext } from "src/shared/types/UserContext";

export async function likePost(ctx: Context) {
  try {
    const userContext: UserContext = ctx.state.user;
    const { postId } = ctx.params;

    const isLiked = await likeService.likePost(postId, userContext);

    ctx.status = isLiked ? 201 : 200;
    ctx.body = {
      data: isLiked,
      message: isLiked ? 
        "Post successfully liked" : "Post successfully unliked "
    }
  } catch(error) {
    throw error
  }
}



