import { Request, Response, NextFunction } from "express";
import { decode } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/UserRepository";
import User from "../models/User";
import result from "src/concerns/response";

async function decoder(req: Request): Promise<User | undefined> {
  const authHeader = req.headers.authorization || "";
  const userRepository = getCustomRepository(UserRepository);

  const [, token] = authHeader?.split(" ");

  const payload = decode(token);

  const user = await userRepository.findOne(payload?.sub, {
    relations: ["roles"],
  });

  return user;
}

function is(role: String[]) {
  const roleAuthorized = async (req: Request, res: Response, next: NextFunction) => {
    const user = await decoder(req);

    const userRoles = user?.roles.map((role) => role.name);

    const existsRoles = userRoles?.some((r) => role.includes(r));

    if (existsRoles) {
      return next();
    }

    return res.status(401).json(result.response('Not authorized!', false));
  };

  return roleAuthorized;
}

export { is };
