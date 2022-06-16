import dotenv from "dotenv";
dotenv.config();
import { validate } from "class-validator";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import User from "../models/User";
import bcrypt from "bcryptjs";

class UserController {

  public async store(req: Request, res: Response) {
    try {
      const repository = AppDataSource.getRepository(User)

      const { full_name, email, password, secret_key } = req.body;

      if (secret_key !== String(process.env.SECRET_KEY))
        return res.sendStatus(401);

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
        delete user.password;
        return res.json(user);
      }
    } catch {
      return res.status(400).json(null)
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const repository = AppDataSource.getRepository(User);

      const { userId } = req;

      const user = await repository.findOne({ where: { id: userId } });

      const { email, full_name, password, current_password } = req.body;

      const isValidPassword = await bcrypt.compare(current_password, user.password);

      if (!isValidPassword) return res.sendStatus(401);
      
      await repository.update(
        {
          id: userId
        },
        {
          email: email || user.email,
          full_name: full_name || user.full_name,
          password: password || user.password,
        }
      )

      const newUser = await repository.findOne({ where: { id: userId } });

      delete newUser.password;
      return res.json(newUser);
    } catch {
      return res.status(400).json(null);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const repository = AppDataSource.getRepository(User);

      const { userId } = req;
      const user = await repository.findOne({ where: { id: userId } });

      const { password } = req.body;

      if (!password) return res.status(401).json({
        error: "Faltando a senha."
      })

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) return res.sendStatus(401);

      await repository.delete({ id: userId });

      return res.json({
        deleted: true 
      })
    } catch {
      return res.status(400).json(null);
    }
  }
}

export default new UserController();
