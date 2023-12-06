import { AppDataSource } from '../../data-source';
import { User } from '../../entities';


const listUsersService = async () => {
  const userRepository = AppDataSource.getRepository(User);
  const announcements = await userRepository.find();
  return announcements;
};

export {listUsersService}