import { UserContext } from "src/shared/types/UserContext";
import { AppDataSource } from "../../shared/db/datasource";
import { PostEntity } from "../entities/post-entity";
import { Post } from "../models/Post";
import { FeedPost } from "../models/FeedPost";
import { Profile } from "src/user/models/profile";
import { CreatePost } from "../validators/create-post-validator";
import { LikeEntity } from "../entities/like-entity";

const postRepository = AppDataSource.getRepository(PostEntity);

function toDomain(post: PostEntity): Post {
  return post as Post
}

export async function createPost(post: CreatePost & {image: string}, userContext: UserContext): Promise<Post> {
  const newPost = await postRepository.save({...post, user: userContext});
  return toDomain(newPost);
}


export async function getAllPosts(): Promise<Omit<FeedPost, "is_liked">[]> {
  const posts = await postRepository.find({
    relations: ['user.profile', 'likes.liking_user']
  });

  const mapLike = (like: LikeEntity) => {
    return {
      id: like.id, 
      liking_user: {
        id: like.liking_user.id,
        email: like.liking_user.email
      }
    }
  }
  
  return posts.map(post => {
    const {user, ...rest} = post;
    return {
      ...rest,
      likes: rest.likes.map(mapLike),
      profile: user.profile as Profile, 
      user: {email: user.email}
    }
  });
}


