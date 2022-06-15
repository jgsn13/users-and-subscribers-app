import { Router } from "express";
import subscriberController from "./controllers/SubscriberController";
import userController from "./controllers/UserController";

const router = Router();

router.post("/users", userController.store);

router.post("/subscribers", subscriberController.store);

export default router;
