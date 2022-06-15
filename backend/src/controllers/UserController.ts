import { validate } from "class-validator";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import User from "../models/User";

class UserController {
  public async store(req: Request, res: Response) {
    try {
      const repository = AppDataSource.getRepository(User);

      const { full_name, email, password } = req.body;

      const userExists = await repository.findOne({ where: { email } });

      if (userExists) {
        return res.sendStatus(409);
      }

      const user = new User();
      user.full_name = full_name;
      user.email = email;
      user.password = password;

      const errors = await validate(user);
      if (errors.length > 0) {
        throw new Error('Validation failed!')
      } else {
        await repository.manager.save(user);
        return res.json(user);
      }
    } catch (error) {
      return res.status(500).json({ error })
    }
  }
}

export default new UserController();
