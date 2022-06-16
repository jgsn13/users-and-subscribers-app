import { Router } from "express";
import subscriberController from "./controllers/SubscriberController";
import userController from "./controllers/UserController";
import authController from "./controllers/AuthController";
import authMiddleware from "./middlewares/authMiddleware";

const router = Router();

router.post("/users", userController.store);
router.put("/users", authMiddleware, userController.update);
router.delete("/users", authMiddleware, userController.delete);

router.post("/authenticate", authController.authenticate);
router.post("/subscribers", subscriberController.store);

export default router;
