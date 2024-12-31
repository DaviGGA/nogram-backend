import * as profileRepository from "../repositories/profile-repository";
import * as userRepository from "../repositories/user-repository";
import { UserNotFoundException } from "../errors/UserNotFoundException";
import { ProfileNotFoundException } from "../errors/ProfileNotFoundException";
import multer from "@koa/multer";
import { UserContext } from "src/shared/types/UserContext";
import { Profile } from "../models/profile";
import { User } from "../models/user";


export async function createProfile(userContext: UserContext, profile: Profile) {
  const createdProfile = await profileRepository.createProfile(userContext, profile);
  return createdProfile;
}

export async function getLoggedUserProfile(userContext: UserContext) {
  const loggedUserProfile = await profileRepository.findProfileByUserEmail(userContext.email);
  if(!loggedUserProfile) throw new ProfileNotFoundException();
  return loggedUserProfile
}

export async function getLoggedUser(userContext: UserContext): Promise<User> {
  const foundUser = await userRepository.findUserById(userContext.id);
  if(!foundUser) throw new UserNotFoundException();
  return foundUser;
}

export async function uploadProfileImage(profileId: number, image: multer.File): Promise<void> {
  const imageName = image.filename;
  await profileRepository.updateProfileImage(profileId, imageName);
}

