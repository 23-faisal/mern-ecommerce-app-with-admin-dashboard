import express from "express";
import {
  RegisterUser,
  LoginUser,
} from "../../controllers/auth/auth.controllers.js";

const authRouter = express.Router();

// register route
authRouter.post("/register", RegisterUser);

// login route

// logout route

authRouter.post("/login", LoginUser);

// middleware

export default authRouter;
