import * as profileRepository from "../repositories/profile-repository";
import * as userRepository from "../repositories/user-repository";
import { UserNotFoundException } from "../errors/UserNotFoundException";
import { ProfileNotFoundException } from "../errors/ProfileNotFoundException";
import multer from "@koa/multer";
import { UserContext } from "src/shared/types/UserContext";
import { Profile } from "../models/profile";
import { User } from "../models/user";
import { Entity } from "src/shared/types/Entity";


export async function createProfile(userContext: UserContext, profile: Profile) {
  // Should be a transaction
  const createdProfile = await profileRepository.createProfile(userContext, profile);
  await userRepository.updateProfile(createdProfile as Entity<Profile>, userContext)
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

export async function getProfileByUsername(username: string) {
  const foundProfile = await profileRepository.findProfileByUsername(username);
  if(!foundProfile) throw new ProfileNotFoundException();
  return foundProfile;
}
