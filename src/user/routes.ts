import { Router } from "express";
import * as userController from "./controller";
import { checkAuthUser } from "../mildleware/auth";

const userRoutes = Router();

userRoutes.get("/autologin", checkAuthUser, userController.autoLogin);

userRoutes.post("/signup", userController.signUp);

userRoutes.post("/login", userController.logIn);

userRoutes.post("/logout", userController.logOut);

userRoutes.get("/:id", userController.getUser);

userRoutes.get("/", userController.getAllUser);

export default userRoutes;
