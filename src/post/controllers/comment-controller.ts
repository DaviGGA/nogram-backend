import { Context } from "koa";
import * as commentService from "../services/comment-service";
import { UserContext } from "src/shared/types/UserContext";
import { validateCreateComment } from "../validators/create-comment-validator";

export async function createComment(ctx: Context) {
  try {
    const commentBody = validateCreateComment(ctx.request.body);
    const { id } = ctx.params;
    const userContext: UserContext = ctx.state.user;

    const newComment = await commentService.commentPost(commentBody.text, userContext, id);

    ctx.status = 201;
    ctx.body = {
      data: newComment,
      message: "Comment successfully created."
    }
  } catch(error) {
    throw error
  }
}