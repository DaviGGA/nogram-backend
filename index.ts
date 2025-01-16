import Koa from "koa";
import "reflect-metadata"
import "./src/shared/db/datasource";
import { authRouter } from "./src/user/routers/auth-routes";
import { profileRouter } from "./src/user/routers/profile-routes";
import { postRouter } from "./src/post/routers/post-routes";
import { commentRouter } from "./src/post/routers/comment-routes";
import { likeRouter } from "./src/post/routers/like-routes";
import { chatRouter } from "./src/chat/routers/chat-routes";
import { messageRouter } from "./src/chat/routers/message-routes";
import bodyParser from 'koa-bodyparser';
import { errorHandler } from "./src/shared/middlewares/errorHandler";
import jwt from "koa-jwt";
import cors from "@koa/cors";
import serve from "koa-static";
import mount from "koa-mount";
import path from "path";
import { Server } from "socket.io";
import http from "http";
import * as messageService from "./src/chat/services/message-service";
import 'dotenv/config';

const app = new Koa();

// Socket

const server = http.createServer().listen(3002);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",  
    methods: ["GET", "POST"],        
    credentials: true          
}
});

io.on("connection", socket => {

  socket.on("join room", ({sender, receiver}) => {
    const keyRoom = [sender, receiver].sort().join("/");
    socket.join(keyRoom);
  })

  socket.on("send message", ({sender, receiver ,message, chatId, senderUserId}) => {
    const keyRoom = [sender, receiver].sort().join("/");
    messageService.createMessage(senderUserId, message, chatId);
    io.to(keyRoom).emit("chat message", {message, sender});
  })

})

const profileImageDir = path.join(__dirname, 'profile-images');
const postImageDir = path.join(__dirname, "post-images")

// Middlewares
app.use(bodyParser());
app.use(cors());
app.use(errorHandler);

// Public routes
app.use(authRouter.routes());

app.use(jwt({secret: process.env.JWT_SECRET!}))
// Authenticated routes
app.use(profileRouter.routes());
app.use(postRouter.routes());
app.use(likeRouter.routes());
app.use(commentRouter.routes());
app.use(chatRouter.routes());
app.use(messageRouter.routes());
app.use(mount("/assets/profile-image", serve(profileImageDir)));
app.use(mount("/assets/post-image", serve(postImageDir)));

app.listen(3001, () => {
  console.log("Server open on port 3001")
});