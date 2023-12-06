import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";

const listUserByIdService = async (id: any) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    id: id,
  });
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
};

export { listUserByIdService };
