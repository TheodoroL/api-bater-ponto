import { Router } from "express";
import AuthMiddleware from "../middleware/AuthMiddleware";
import PointController from "../controller/PointController";
export const pointRouter = Router();
pointRouter.post("/", AuthMiddleware.AuthControllerjWT, PointController.createPoint);
pointRouter.get("/", AuthMiddleware.AuthControllerjWT, PointController.findAllPoint);
pointRouter.get("/:id", AuthMiddleware.AuthControllerjWT, PointController.findPointById);
pointRouter.delete("/:id", AuthMiddleware.AuthControllerjWT, PointController.deletePoint);
pointRouter.put("/:id", AuthMiddleware.AuthControllerjWT, PointController.updatePoint);