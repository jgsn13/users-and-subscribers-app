import dotenv from "dotenv";
dotenv.config();
import validator from "validator";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import User from "../models/User";
import bcrypt from "bcryptjs";

class UserController {

  public async store(req: Request, res: Response) {
    try {
      const repository = AppDataSource.getRepository(User)

      const { full_name, email, password, secret_key } = req.body;

      const errors: String[] = [];

      if (secret_key !== String(process.env.SECRET_KEY))
        errors.push("Chave de registro inválida")

      const userExists = await repository.findOne({ where: { email } });

      if (userExists)
        errors.push("Email já existe")

      if (full_name.length < 3 || full_name.length > 250)
        errors.push("Nome precisa ter entre 3 e 250 caracteres")

      if (!validator.isEmail(email))
        errors.push("Email inválido")

      if (password.length < 6 || full_name.length > 50)
        errors.push("Senha precisa ter entre 6 e 50 caracteres")

      if (errors.length > 0) {
        return res.status(400).json({ errors })
      } else {
        const user = new User();
        user.full_name = full_name;
        user.email = email;
        user.password = password
        await repository.manager.save(user);
        delete user.password;
        return res.json(user);
      }
    } catch {
      return res.status(400).json({ errors: ["Ocorreu um erro inesperado"] });
    }
  }

  public async show(req: Request, res: Response) {
    try {
      const repository = AppDataSource.getRepository(User)

      const { userId } = req;

      const user = await repository.findOne({ where: { id: userId } });

      delete user.password;
      return res.json(user);
    } catch {
      return res.status(400).json({ errors: ["Ocorreu um erro inesperado"] });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const repository = AppDataSource.getRepository(User);

      const { userId } = req;

      const user = await repository.findOne({ where: { id: userId } });

      const errors: String[] = [];

      const { email, full_name, password, current_password } = req.body;

      const isValidPassword = await bcrypt.compare(current_password, user.password);

      if (!isValidPassword)
        errors.push("Senha incorreta")

      const userExists = await repository.findOne({ where: { email } });

      if (userExists)
        errors.push("Email já existe")

      if (full_name.length < 3 || full_name.length > 250)
        errors.push("Nome precisa ter entre 3 e 250 caracteres")

      if (!validator.isEmail(email))
        errors.push("Email inválido")

      if (password.length < 6 || full_name.length > 50)
        errors.push("Nova senha precisa ter entre 6 e 50 caracteres")
      
      if (errors.length > 0) {
        return res.status(400).json({ errors })
      } else {
        await repository.update(
          {
            id: userId
          },
          {
            full_name: full_name || user.full_name,
            email: email || user.email,
            password: password || user.password,
          }
        )

        const newUser = await repository.findOne({ where: { id: userId } });

        delete newUser.password;
        return res.json(newUser);
      }
    } catch {
      return res.status(400).json({ errors: ["Ocorreu um erro inesperado"] });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const repository = AppDataSource.getRepository(User);

      const { userId } = req;
      const user = await repository.findOne({ where: { id: userId } });

      const { password } = req.body;

      const errors: String[] = []

      if (!password)
        errors.push("Faltando a senha")

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword)
        errors.push("Senha incorreta")

      if (errors.length > 0) {
        return res.status(400).json({ errors })
      } else {
        await repository.delete({ id: userId });

        return res.json({
          deleted: true 
        })
      }
    } catch {
      return res.status(400).json({ errors: ["Ocorreu um erro inesperado"] });
    }
  }
}

export default new UserController();
