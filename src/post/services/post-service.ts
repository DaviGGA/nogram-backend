import { UserContext } from "src/shared/types/UserContext";
import { Post } from "../models/Post";
import * as postRepository from "../repositories/post-repository";
import { isLiked } from "../logic/post-logic";
import { CreatePost } from "../validators/create-post-validator";

export async function createPost(post: CreatePost & {image: string}, userContext: UserContext) {
  const createdProfile = await postRepository.createPost(post, userContext);
  return createdProfile;
}

export async function getFeed(userContext: UserContext) {
  const feed = await postRepository.getAllPosts();
  return feed.map((post: any) => ({
    ...post, 
    is_liked: isLiked(post, userContext)
  }))
}

export async function getPostsByUser(username: string) {
  return await postRepository.getPostsByUsername(username);
}

