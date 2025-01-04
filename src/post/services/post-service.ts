import { UserContext } from "src/shared/types/UserContext";
import { Post } from "../models/Post";
import * as postRepository from "../repositories/post-repository";

export async function createPost(post: Post, userContext: UserContext) {
  const createdProfile = await postRepository.createPost(post, userContext);
  return createdProfile;
}

export async function getFeed() {
  return await postRepository.getAllPosts();
}


