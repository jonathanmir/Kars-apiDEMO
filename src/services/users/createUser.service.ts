import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import {
  IUserReturn,
  IUserReturnWithOutPassword,
  iUserRepo,
  iUserRequest,
} from "../../interfaces/users.interfaces";
import { SchemaReturnUserWithOutPassword } from "../../schemas/users.schemas";

const createUserService = async (userData: iUserRequest) => {
  const userRepo: iUserRepo = AppDataSource.getRepository(User);
  const user = userRepo.create(userData as DeepPartial<User>);
  await userRepo.save(user);
  const newUser: IUserReturnWithOutPassword =
    SchemaReturnUserWithOutPassword.parse(user);
  return newUser;
};

export { createUserService };
