import { Request, Response, Router } from "express";
import subscriberController from "./controllers/SubscriberController";
import userController from "./controllers/UserController";
import authController from "./controllers/AuthController";
import authMiddleware from "./middlewares/authMiddleware";

const router = Router();

router.post("/users", userController.store);
router.put("/users", authMiddleware, userController.update);
router.delete("/users", authMiddleware, userController.delete);

router.post("/authenticate", authController.authenticate);

router.post("/subscribers", authMiddleware, subscriberController.store);
router.get("/subscribers", authMiddleware, subscriberController.index);
router.get("/subscribers/:id", authMiddleware, subscriberController.show);
router.put("/subscribers/:id", authMiddleware, subscriberController.update);
router.delete("/subscribers/:id", authMiddleware, subscriberController.delete);

router.get("/", (_req: Request, res: Response) => {
  return res.send("Index");
});

router.use((req: Request, res: Response) => {
  return res.status(404).send(`"${req.url}" What???`);
});

export default router;
