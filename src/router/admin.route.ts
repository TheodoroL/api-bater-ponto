import { Router } from "express";
import AuthMiddleware from "../middleware/AuthMiddleware";
import AdminMiddleware from "../middleware/AdminMiddleware";
import AdminController from "../controller/AdminController";

export const adminRouter: Router = Router();

adminRouter.get("/", AuthMiddleware.AuthControllerjWT, AdminMiddleware.verifyAdmin, AdminController.findAllUser)
adminRouter.get("/seach", AuthMiddleware.AuthControllerjWT, AdminMiddleware.verifyAdmin, AdminController.findByUserName)
adminRouter.patch("/:id", AuthMiddleware.AuthControllerjWT, AdminMiddleware.verifyAdmin, AdminController.toggleUserRole)