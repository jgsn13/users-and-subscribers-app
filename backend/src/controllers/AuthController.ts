import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User";

class AuthController {
  public async authenticate(req: Request, res: Response) {
    try {
      const repository = AppDataSource.getRepository(User);
      const { email, password } = req.body;

      const user = await repository.findOne({ where: { email } })

      if (!user) {
        return res.sendStatus(401);
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.sendStatus(401);
      }

      const token = jwt.sign({ id: user.id }, String(process.env.JWT_PAYLOAD), { expiresIn: "1d" });

      delete user.password;

      return res.json({
        user,
        token,
      })

    } catch (error) {
      return res.status(500).json({ error })
    }
  }
}

export default new AuthController();
