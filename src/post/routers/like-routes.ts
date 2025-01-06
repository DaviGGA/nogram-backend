import Router from "@koa/router";
import * as likeController from "../controllers/like-controller"

export const likeRouter = new Router({prefix: "/like"});

likeRouter.post("/:postId", likeController.likePost);
