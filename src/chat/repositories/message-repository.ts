import { AppDataSource } from "../../shared/db/datasource";
import { MessageEntity } from "../entities/message-entity";
import { Message } from "../models/Message";

const messageRepository = AppDataSource.getRepository(MessageEntity);

function mapMessage(message: MessageEntity): Message {
  const {sender, ...rest} = message;
  return {
    ...rest,
    sender: sender.profile!
  }
}

export async function createMessage(senderId: number, content: string, chatId: number) {
  return await messageRepository.save({
    sender: {id: senderId},
    content,
    chat: {id: chatId}
  })
}

export async function getMessagesByChat(chatId: number): Promise<Message[]> {
  const messages = await messageRepository.find({
    relations: ["sender.profile"],
    where: {
      chat: {id: chatId}
    }
  })

  return messages.map(mapMessage);
}