import Koa from "koa";
import "reflect-metadata"
import "./src/shared/db/datasource";
import { authRouter } from "./src/user/routers/auth-routes";
import { profileRouter } from "./src/user/routers/profile-routes";
import { postRouter } from "./src/post/routers/post-routes";
import { likeRouter } from "./src/post/routers/like-routes";
import bodyParser from 'koa-bodyparser';
import { errorHandler } from "./src/shared/middlewares/errorHandler";
import jwt from "koa-jwt";
import cors from "@koa/cors";
import serve from "koa-static";
import mount from "koa-mount";
import path from "path";

const app = new Koa();

const profileImageDir = path.join(__dirname, 'profile-images');
const postImageDir = path.join(__dirname, "post-images")

// Middlewares
app.use(bodyParser());
app.use(cors());
app.use(errorHandler);

// Public routes
app.use(authRouter.routes());

app.use(jwt({secret: "super-secret"}))
// Authenticated routes
app.use(profileRouter.routes());
app.use(postRouter.routes());
app.use(likeRouter.routes());
app.use(mount("/assets/profile-image", serve(profileImageDir)));
app.use(mount("/assets/post-image", serve(postImageDir)));

app.listen(3001, () => {
  console.log("Server open on port 3001")
});