import { AppDataSource } from "../../shared/db/datasource";
import { UserEntity } from "../entities/user-entity";
import { User } from "../models/user";

const userRepository = AppDataSource.getRepository(UserEntity)

function toDomain(userEntity: UserEntity): User {
  return userEntity as User;
}

export async function createUser(user: User): Promise<User> {
  const newUser = await userRepository.save(user);
  return toDomain(newUser);
}

export async function findUserById(id: number): Promise<User | null> {
  const foundUser = await userRepository.findOne({where: {id}});
  return foundUser ? toDomain(foundUser) : null
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const foundUser = await userRepository.findOne({where: {email}});
  return foundUser ? toDomain(foundUser) : null
}

export async function deleteUserById(id: number): Promise<void> {
  await userRepository.delete({id})
}

