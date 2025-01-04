import { UserContext } from "src/shared/types/UserContext";
import { AppDataSource } from "../../shared/db/datasource";
import { PostEntity } from "../entities/post-entity";
import { Post } from "../models/Post";
import { PostProfile } from "../entities/post-profile";
import { Profile } from "src/user/models/profile";

const postRepository = AppDataSource.getRepository(PostEntity);

function toDomain(post: PostEntity): Post {
  return post as Post
}

export async function createPost(post: Post, userContext: UserContext): Promise<Post> {
  const newPost = await postRepository.save({...post, user: userContext});
  return toDomain(newPost);
}


export async function getAllPosts(): Promise<PostProfile[]> {
  const posts = await postRepository.find({
    relations: ['user.profile']
  });
  
  return posts.map(post => {
    const {user, ...rest} = post;
    return {...rest, profile: user.profile as Profile}
  });
}


