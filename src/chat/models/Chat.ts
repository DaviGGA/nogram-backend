import { Profile } from "../../user/models/profile"
import { User } from "../../user/models/user"
import { Message } from "./Message"

export type Chat = {
  profile1: Profile,
  profile2: Profile,
}

export type ChatWithMessages = Chat & {messages: Message[]}

export type CreatedChat = {
  user1: User,
  user2: User
}

