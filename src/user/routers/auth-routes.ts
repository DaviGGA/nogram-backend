import Router from "@koa/router";
import * as authController from "../controllers/auth-controller";

export const authRouter = new Router({prefix: "/auth"});

authRouter.post("/", authController.createUser);
authRouter.post("/login", authController.login);
