import { UserContext } from "src/shared/types/UserContext";
import { AppDataSource } from "../../shared/db/datasource";
import { PostEntity } from "../entities/post-entity";
import { Post } from "../models/Post";

const postRepository = AppDataSource.getRepository(PostEntity);

function toDomain(post: PostEntity): Post {
  return post as Post
}

export async function createPost(post: Post, userContext: UserContext): Promise<Post> {
  const newPost = await postRepository.save({...post, user: userContext});
  return toDomain(newPost);
}


