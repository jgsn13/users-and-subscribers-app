import { Request, Response, Router } from "express";
import subscriberController from "./controllers/SubscriberController";
import userController from "./controllers/UserController";
import authController from "./controllers/AuthController";
import authMiddleware from "./middlewares/authMiddleware";

const router = Router();

router.post("/user/register", userController.store);
router.get("/user", authMiddleware, userController.show);
router.put("/user", authMiddleware, userController.update);
router.delete("/user", authMiddleware, userController.delete);

router.post("/authenticate", authController.authenticate);

router.post("/subscriber/register", authMiddleware, subscriberController.store);
router.get("/subscribers", subscriberController.index);
router.get("/subscriber/:id", subscriberController.show);
router.put("/subscriber/:id", authMiddleware, subscriberController.update);
router.delete("/subscriber/:id", authMiddleware, subscriberController.delete);

router.get("/", (_req: Request, res: Response) => {
  return res.send(`
    <h1>Index!</h1>
    <p>Visit /docs</p>
  `);
});

router.use((req: Request, res: Response) => {
  return res.status(404).send(`${req.url} What???`);
});

export default router;
