import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User, { IUser } from "../models/User.ts";

// Interface for JWT payload
interface DecodedToken {
  id: string;
  iat?: number;
  exp?: number;
}

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        const secret: Secret | undefined = process.env.JWT_SECRET;
        if (!secret) {
          throw new Error("JWT_SECRET is not defined in environment variables.");
        }

        const decoded = jwt.verify(token, secret) as DecodedToken;

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
          res.status(401);
          throw new Error("Not authorized, user not found");
        }

        req.user = user;
        return next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);

const admin = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };