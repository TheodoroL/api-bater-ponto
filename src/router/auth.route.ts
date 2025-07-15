import { Router } from 'express';
import AuthController from '../controller/AuthController';
export const authRouter = Router();

authRouter.post("/", AuthController.createUser);
authRouter.post("/login", AuthController.login);