import { Context } from "koa";
import * as userValidator from "../validators/user-validator";
import * as authService from "../services/auth-service";
import { UserContext } from "../../shared/types/UserContext";

export async function createUser(ctx: Context) {
  try {
    const userBody = userValidator.validateUser(ctx.request.body);
    const newUser = await authService.createUser(userBody);
  
    ctx.status = 201;
    ctx.body = {
      data: newUser,
      message: "User successfully created."
    }
  } catch(error) {
    throw error
  }
}

export async function login(ctx: Context) {
  try {
    const userBody = userValidator.validateUser(ctx.request.body);
    const token = await authService.login(userBody);
  
    ctx.status = 200;
    ctx.body = {
      data: token,
      message: "User login was successfull."
    }
  } catch(error) {
    throw error
  }
}

