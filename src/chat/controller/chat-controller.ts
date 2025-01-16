import { Context } from "koa";
import * as chatService from "../services/chat-service";
import { UserContext } from "src/shared/types/UserContext";

export async function createChatIfNotExist(ctx: Context) {
  try {
    const { id } = ctx.params;
    const userContext: UserContext = ctx.state.user;

    const newChat = await chatService.createChatIfNotExist(userContext, id)
    ctx.status = 201;
    ctx.body = {
      data: newChat,
      message: "Chat successfully created."
    }
  } catch(error) {
    throw error
  }
}

export async function findUserChats(ctx: Context) {
  try {
    const userContext: UserContext = ctx.state.user;

    const chats = await chatService.findUserChats(userContext)
    ctx.status = 200;
    ctx.body = {
      data: chats,
      message: "Chat successfully created."
    }
  } catch(error) {
    throw error
  }
}