import dotenv from "dotenv";
dotenv.config();
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import User from "../models/User";

interface TokenData {
  id: string;
  iat: number;
  exp: number;
}

export default async function authMiddleware(
  req: Request, res: Response, next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, String(process.env.JWT_SECRET));

    const { id } = data as TokenData;

    const user = await AppDataSource.getRepository(User).findOne({ where: { id } });

    if (!user) return res.sendStatus(401);

    req.userId = id;

    return next();
  } catch {
    return res.sendStatus(401);
  }
}
