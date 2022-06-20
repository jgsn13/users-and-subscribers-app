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

      const errors: String[] = []

      if (!user) 
        errors.push("Email não corresponde a nenhum usuário")

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword)
        errors.push("Senha incorreta")

      if (errors.length > 0) {
        return res.status(400).json({ errors })
      } else {
        const token =
          jwt.sign({ id: user.id }, String(process.env.JWT_SECRET), { expiresIn: "1d" });

        delete user.password;

        return res.json({
          user,
          token,
        })
      }

    } catch {
      return res.status(400).json(["Ocorreu um erro inesperado"]);
    }
  }
}

export default new AuthController();
