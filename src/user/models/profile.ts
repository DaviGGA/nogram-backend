import { User } from "./user"

export type Profile = {
  first_name: string,
  surname: string,
  username: string,
  image?: string
}

export type ProfileWithUser = Profile & {user: User}