import { UserContext } from "../../shared/types/UserContext";
import * as messageRepository from "../repositories/message-repository";

export async function createMessage(userId: number, content: string, chatId: number) {
  return await messageRepository.createMessage(userId, content, chatId)
}

export async function getMessagesByChat(chatId: number) {
  return await messageRepository.getMessagesByChat(chatId);
}