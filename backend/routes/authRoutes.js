

import { Router } from "express";
import { register, login } from "../controllers/authController.js";

const authRouter = Router();

authRouter
     .post("/register", register)
     .post("/login", login)

 export default authRouter;      
