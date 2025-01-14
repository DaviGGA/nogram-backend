import { User } from "src/user/models/user";
import { AppDataSource } from "../../shared/db/datasource";
import { ChatEntity } from "../entities/chat-entity";
import { Chat, ChatWithMessages, CreatedChat } from "../models/Chat";


const chatRepository = AppDataSource.getRepository(ChatEntity);

function mapChat(chat: ChatEntity): Chat {
  return {
    profile1: chat?.user1.profile!,
    profile2: chat?.user2.profile!,
  }
}

export async function createChat(userId: number, user2Id: number): Promise<CreatedChat> {
  const chat = await chatRepository.save({
    user1: {id: userId},
    user2: {id: user2Id}
  })
  
  return chat
}

export async function findChatByUserIds(userId: number, user2Id: number): Promise<Chat | null> {
  const chat = await chatRepository.findOne({
    relations: ["user1.profile","user2.profile","messages.sender.profile"],
    where: {
      user1: {id: userId},
      user2: {id: user2Id}
    }
  })

  if(!chat) return null

  return mapChat(chat);
}

export async function findUserChats(userId: number): Promise<Chat[]> {
  const chats = await chatRepository.find({
    relations: ["user1.profile", "user2.profile"],
    where: [
      {user1: {id: userId}},
      {user2: {id: userId}}
    ]
  })

  return chats.map(mapChat)
}



