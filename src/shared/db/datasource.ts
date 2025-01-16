import { MessageEntity } from "../../chat/entities/message-entity";
import { ChatEntity } from "../../chat/entities/chat-entity";
import { CommentEntity } from "../../post/entities/comment-entity";
import { LikeEntity } from "../../post/entities/like-entity";
import { PostEntity } from "../../post/entities/post-entity";
import { ProfileEntity } from "../../user/entities/profile-entity";
import { UserEntity } from "../../user/entities/user-entity";
import { DataSource } from "typeorm";
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST!,
  port: 5432,
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DATABASE!,
  synchronize: true,
  logging: false,
  entities: [UserEntity, ProfileEntity, PostEntity, LikeEntity, CommentEntity, ChatEntity, MessageEntity],
  subscribers: [],
  migrations: [],
})

AppDataSource.initialize()
  .then(() => console.log("Database connected"))
  .catch(err => console.log(err))