import { Context } from "koa";
import { validateCreatePost } from "../validators/create-post-validator";
import * as postService from "../services/post-service";
import { UserContext } from "src/shared/types/UserContext";

export async function createPost(ctx: Context) {
  try {
    const postBody = validateCreatePost(ctx.request.body);
    const userContext: UserContext = ctx.state.user;
    const image = ctx.file.filename;

    const newPost = await postService.createPost({...postBody, image}, userContext);

    ctx.status = 201;
    ctx.body = {
      data: newPost,
      message: "Post successfully created."
    }
  } catch(error) {
    throw error
  }
}

export async function getFeed(ctx: Context) {
  try {
    const userContext: UserContext = ctx.state.user;
    const posts = await postService.getFeed(userContext);

    ctx.status = 200;
    ctx.body = {
      data: posts,
      message: "User post feed successfully loaded"
    }
  } catch(error) {
    throw error
  }
}


