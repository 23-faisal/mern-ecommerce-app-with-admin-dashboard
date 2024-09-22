import express from "express";
import RegisterUser from "../../controllers/auth/auth.controllers.js";

const authRouter = express.Router();

// register route
authRouter.post("/register", RegisterUser);

// login route

// logout route

// middleware

export default authRouter;
