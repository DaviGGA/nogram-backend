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
  entities: [UserEntity],
  subscribers: [],
  migrations: [],
})

AppDataSource.initialize()
  .then(() => console.log("Database connected"))
  .catch(err => console.log(err))