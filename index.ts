import Koa from "koa";
import "reflect-metadata"
import "./src/shared/db/datasource";
import { authRouter } from "./src/user/routers/auth-routes";
import bodyParser from 'koa-bodyparser';
import { errorHandler } from "./src/shared/middlewares/errorHandler";
import jwt from "koa-jwt";
import cors from "@koa/cors";
import { profileRouter } from "./src/user/routers/profile-routes";

const app = new Koa();

app.use(bodyParser());
app.use(cors());
app.use(errorHandler);

// Public routes
app.use(authRouter.routes());

app.use(jwt({secret: "super-secret"}))
// Authenticated routes
app.use(profileRouter.routes());


app.listen(3001, () => {
  console.log("Server open on port 3001")
});