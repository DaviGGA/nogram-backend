import { Entity } from "src/shared/types/Entity";
import { Profile } from "./profile";
import { User } from "./user"

export type UserProfile = User & {profile: Profile | null }