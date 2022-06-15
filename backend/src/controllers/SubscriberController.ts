import { Request, Response } from "express";

class SubscriberController {
  public store(req: Request, res: Response) {
    res.send("Ok")
  }
}

export default new SubscriberController();
