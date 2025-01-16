import { Context } from "koa";
import * as messageService from "../services/message-service";
import { UserContext } from "src/shared/types/UserContext";

export async function getMessagesByChat(ctx: Context) {
  try {
    const { id } = ctx.params;
    const messages = await messageService.getMessagesByChat(id)
    
    ctx.status = 200;
    ctx.body = {
      data: messages,
      message: "Chat messages successfully loaded."
    }
  } catch(error) {
    throw error
  }
}