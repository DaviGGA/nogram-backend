import Router from "@koa/router";
import * as postController from "../controllers/post-controller"
import multer from "@koa/multer";

export const postRouter = new Router({prefix: "/post"});
const upload = multer({dest: "./post-images"});

postRouter.post("/", upload.single("image") ,postController.createPost);
