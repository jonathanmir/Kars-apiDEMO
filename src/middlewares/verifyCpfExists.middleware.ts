import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities';
import { AppError } from '../errors';
import { iUserRepo } from '../interfaces/users.interfaces';


const verifyCpfExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<NextFunction | void> => {

  const cpf: string = req.body.cpf;

  if(!cpf){
    return next()
  }

  const userRepo: iUserRepo = AppDataSource.getRepository(User);

  const foundCpf = await userRepo.findOneBy({ cpf });

  if (foundCpf) {
    throw new AppError("Cpf already registered", 409);
  }

  next();
};

export { verifyCpfExists }
