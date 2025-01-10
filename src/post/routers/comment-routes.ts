import Router from "@koa/router";
import * as commentController from "../controllers/comment-controller"

export const commentRouter = new Router({prefix: "/comment"});

commentRouter.post("/post/:id", commentController.createComment);
