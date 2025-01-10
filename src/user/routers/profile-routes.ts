import Router from "@koa/router";
import * as profileController from "../controllers/profile-controller";
import multer from "@koa/multer";

export const profileRouter = new Router({prefix: "/profile"});
const upload = multer({dest: "./profile-images"});

profileRouter.post("/", profileController.createProfile);
profileRouter.post("/profile-image/:profileId", upload.single("image"), profileController.uploadProfileImage)
profileRouter.get("/me", profileController.getLoggedUserProfile);
profileRouter.get("/user/me", profileController.getLoggedUser);
profileRouter.get("/:username" , profileController.getProfileByUsername);
