import { Router, Request, Response } from "express";
import { login, signup } from "../controllers/auth";

const authRoutes: Router = Router();

authRoutes.get("/login", login);
authRoutes.get("/signup", signup);

export default authRoutes;
