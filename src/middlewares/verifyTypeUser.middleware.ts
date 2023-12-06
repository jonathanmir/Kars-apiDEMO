import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const verifyUserTyper = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<NextFunction | void> => {
  const autenticatedUser = req.user;

  if (autenticatedUser.userType === "buyer") {
    throw new AppError(
      "You do not have permission to perform this action with this type of account",
      403
    );
  }

  return next();
};

export { verifyUserTyper };
