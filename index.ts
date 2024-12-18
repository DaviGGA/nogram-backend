import Koa from "koa";
import "reflect-metadata"
import "./src/shared/db/datasource";
import { authRouter } from "./src/user/routers/auth-routes";
import bodyParser from 'koa-bodyparser';
import { errorHandler } from "./src/shared/middlewares/errorHandler";
import jwt from "koa-jwt";
import Router from "@koa/router";

const app = new Koa();

app.use(bodyParser())

app.use(errorHandler);

// Public routes
app.use(authRouter.routes());

app.use(jwt({secret: "super-secret"}))
// Authenticated routes
const router = new Router;
router.get('/test', (ctx) => {
  ctx.body = {data: "it works!"}
  ctx.status = 200
})
app.use(router.routes())

app.listen(3001, () => {
  console.log("Server open on port 3001")
});