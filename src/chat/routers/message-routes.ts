import Router from "@koa/router";
import * as messageController from "../controller/message-controller"

export const messageRouter = new Router({prefix: "/message"});

messageRouter.get("/chat/:id", messageController.getMessagesByChat);
