import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import {
  IUpdatedUserReturnWithoutPassword,
  IUserReturnWithOutPassword,
  iUserPartial,
  iUserRepo,
} from "../../interfaces/users.interfaces";
import { SchemaReturnUpdateUserWithoutPassword } from "../../schemas/users.schemas";

const updateUserService = async (
  userData: iUserPartial,
  userId: string
): Promise<IUpdatedUserReturnWithoutPassword> => {
  const userRepo: iUserRepo = AppDataSource.getRepository(User);

  const oldUserData = await userRepo.findOneBy({
    id: userId,
  });

  const user = userRepo.create({
    ...oldUserData,
    ...userData,
  });

  await userRepo.save(user);

  const updatedUser: IUpdatedUserReturnWithoutPassword =
    SchemaReturnUpdateUserWithoutPassword.parse(user);

  return updatedUser;
};

export { updateUserService };
