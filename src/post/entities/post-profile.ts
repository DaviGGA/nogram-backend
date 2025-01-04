import { Profile } from "src/user/models/profile";
import { Post } from "../models/Post";

export type PostProfile = Post & {profile: Profile}