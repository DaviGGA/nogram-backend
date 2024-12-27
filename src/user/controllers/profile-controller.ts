import { UserContext } from "@shared/types/UserContext";
import { Context } from "koa";
import * as profileService from "../services/profile-service";
import { validateProfile } from "../validators/profile-validator";

export async function createProfile(ctx: Context) {
  try {

    const userContext: UserContext = ctx.state.user;
    const profileBody = validateProfile(ctx.request.body);
    const createdProfile = await profileService.createProfile(userContext, profileBody)
  
    ctx.status = 201;
    ctx.body = {
      data: createdProfile,
      message: "Profile successfully created."
    }
  } catch(error) {
    throw error
  }
}

export async function uploadProfileImage(ctx: Context) {
  try {
    const image = ctx.file;
    const { profileId } = ctx.params;

    await profileService.uploadProfileImage(profileId, image);
  
    ctx.status = 200;
    ctx.body = {
      data: {},
      message: "Profile image successfully uploaded."
    }
  } catch(error) {
    throw error
  }
}

export async function getLoggedUser(ctx: Context) {
  try {
    const userContext: UserContext = ctx.state.user;  
    const loggedUser = await profileService.getLoggedUser(userContext);

    ctx.status = 200;
    ctx.body = {
      data: loggedUser,
      message: "Logged user was successfully found."
    }
  } catch(error) {
    throw error
  }
}

export async function getLoggedUserProfile(ctx: Context) {
  try {
    const userContext: UserContext = ctx.state.user;
    const foundProfile = await profileService.getLoggedUserProfile(userContext);
  
    ctx.status = 200;
    ctx.body = {
      data: foundProfile,
      message: "Logged profile successfully found."
    }
  } catch(error) {
    throw error
  }
}