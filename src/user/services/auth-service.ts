import { AuthToken } from "@shared/types/AuthToken";
import { EmailAlrealdyUsedException } from "../errors/EmailAlrealdyUsedException";
import { User } from "../models/user";
import * as userRepository from "../repositories/user-repository";
import { UserNotFoundException } from "../errors/UserNotFoundException";
import { compare, hash } from 'bcrypt';
import { PasswordMismatchException } from "../errors/PasswordMismatchException";
import jwt from "jsonwebtoken";

export async function createUser(user: User): Promise<User> {
  const userAlrealdyExists = await userRepository.findUserByEmail(user.email);
  if(userAlrealdyExists) throw new EmailAlrealdyUsedException();
  
  const hashedPassword = await hash(user.password, 10);
  const createdUser = await userRepository.createUser({
    ...user, 
    password: hashedPassword
  });
  
  return createdUser;
}

export async function login(user: User): Promise<AuthToken> {
  const foundUser = await userRepository.findUserByEmail(user.email);
  if(!foundUser) throw new UserNotFoundException();
  
  const passwordMatches: boolean = await compare(user.password, foundUser.password);
  if(!passwordMatches) throw new PasswordMismatchException();
  
  const token = jwt.sign(
    {email: foundUser.email},
    "super-secret",
    {expiresIn: "3d"}
  )
  
  return {token}
}