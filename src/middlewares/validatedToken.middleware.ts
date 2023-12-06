import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
import jwt from "jsonwebtoken";

const verifyTokenIsValid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token = req.headers.authorization;

  const userId = req.params.id;

  if (!token) {
    throw new AppError("Missing bearer token", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (error: any, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    if (
      req.method === "PATCH" &&
      req.baseUrl === "/users" &&
      userId !== decoded.sub
    ) {
      throw new AppError("Permission denied", 401);
    }

    if (
      req.method === "DELETE" &&
      req.baseUrl === "/users" &&
      userId !== decoded.sub
    ) {
      throw new AppError("Permission denied", 401);
    }

    req.user = {
      id: decoded.sub,
      userType: decoded.userType,
    };

    return next();
  });
};

export { verifyTokenIsValid };
