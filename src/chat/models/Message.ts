import { Profile } from "../../user/models/profile"

export type Message = {
  sender: Profile,
  content: string,
  created_at: Date
}