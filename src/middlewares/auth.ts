import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { jwtService } from "../services/jwtServices";
import { userService } from "../services/userServices";
import { UserInstance } from "../models/User";

export interface AuthenticatedRequest extends Request {
  user?: UserInstance | null;
}

export function ensureAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: "unauthorized: token not found" });
  }

  const token = authorizationHeader.replace(/Bearer /, "");

  jwtService.verifyToken(token, async (err, decoded) => {
    if (err || typeof decoded === "undefined") {
      return res.status(401).json({ message: "unauthorized: invalid token" });
    }

    const user = await userService.findByEmail((decoded as JwtPayload).email);
    req.user = user;

    next();
  });
}

export function ensureAuthViaQuery(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { token } = req.query;

  if (!token) {
    return res.status(401).json({ message: "unauthorized: token not found" });
  }

  if (typeof token !== "string") {
    return res.status(400).json({ message: "Token must be of type string" });
  }

  jwtService.verifyToken(token, async (err, decoded) => {
    if (err || typeof decoded === "undefined") {
      return res.status(401).json({ message: "unauthorized: invalid token" });
    }

    const user = await userService.findByEmail((decoded as JwtPayload).email);
    req.user = user;

    next();
  });
}
