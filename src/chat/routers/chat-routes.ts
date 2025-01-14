import Router from "@koa/router";
import * as chatController from "../controller/chat-controller"

export const chatRouter = new Router({prefix: "/chat"});

chatRouter.post("/user/:id", chatController.createChatIfNotExist);
chatRouter.get("/logged-user", chatController.findUserChats);
