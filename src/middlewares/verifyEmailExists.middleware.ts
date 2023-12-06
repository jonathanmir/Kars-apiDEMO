import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities';
import { AppError } from '../errors';
import { iUserRepo } from '../interfaces/users.interfaces';


const verifyEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<NextFunction | void> => {

  const email: string = req.body.email;

  if(!email){
    return next()
  }

  const userRepo: iUserRepo = AppDataSource.getRepository(User);

  const foundEmail = await userRepo.findOneBy({ email });

  if (foundEmail) {
    throw new AppError("Email already exists", 409);
  }

  next();
};

export { verifyEmailExists }
