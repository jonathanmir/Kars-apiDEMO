import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";
import { Repository } from "typeorm";

const verifyUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
    
    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const userId: string = String(req.params.id)

    const findUser = await userRepository.findOneBy({
        id: userId
    })

    if(!findUser) {
        throw new AppError("User not found", 404)
    }

    return next()
};

export default verifyUserExists;
