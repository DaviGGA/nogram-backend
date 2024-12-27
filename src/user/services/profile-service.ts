import { Profile } from "@user/models/profile";
import { User } from "@user/models/user";
import * as profileRepository from "../repositories/profile-repository";
import * as userRepository from "../repositories/user-repository";
import { UserNotFoundException } from "../errors/UserNotFoundException";
import { UserContext } from "@shared/types/UserContext";
import { ProfileNotFoundException } from "../errors/ProfileNotFoundException";
import multer from "@koa/multer";


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

