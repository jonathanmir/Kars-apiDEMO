import { Request, Response, NextFunction } from "express";
import { AppError } from '../errors';

const protectRoutes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<NextFunction | void> => {

  const autenticatedUser = req.user;
  const id = req.params.id

  if (autenticatedUser.id !== id) {
    throw new AppError('Insufficient permission', 403);
  }

  return next()
};

export { protectRoutes };
