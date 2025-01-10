import { CommentEntity } from "../../post/entities/comment-entity";
import { LikeEntity } from "../../post/entities/like-entity";
import { PostEntity } from "../../post/entities/post-entity";
import { ProfileEntity } from "../../user/entities/profile-entity";
import { UserEntity } from "../../user/entities/user-entity";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "nogram",
  synchronize: true,
  logging: true,
  entities: [UserEntity, ProfileEntity, PostEntity, LikeEntity, CommentEntity],
  subscribers: [],
  migrations: [],
})

AppDataSource.initialize()
  .then(() => console.log("Database connected"))
  .catch(err => console.log(err))