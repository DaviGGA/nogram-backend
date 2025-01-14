import { UserContext } from "../../shared/types/UserContext";
import * as chatRepository from "../repositories/chat-repository";

export async function createChatIfNotExist(userContext: UserContext, user2Id: number) {
  const foundChat = await chatRepository.findChatByUserIds(userContext.id, user2Id);
  if(foundChat) return null;
  return await chatRepository.createChat(userContext.id, user2Id);
}

export async function findUserChats(userContext: UserContext) {
  const chats = await chatRepository.findUserChats(userContext.id);
  return chats;
}