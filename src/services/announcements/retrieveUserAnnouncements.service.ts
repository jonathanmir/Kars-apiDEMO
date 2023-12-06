import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { Announcement, User } from "../../entities";
import { AppError } from "../../errors";

const listUserAnnouncementsService = async (userId: string, req: Request) => {
  try {
    const announcementsRepository = AppDataSource.getRepository(Announcement);
    const usersRepo = AppDataSource.getRepository(User);
    const user = await usersRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new AppError("User not found!", 404);
    }

    if (req.user) {
      if (user.id === req.user.id) {
        const announcements = await announcementsRepository
          .createQueryBuilder("announcement")
          .where("announcement.userId = :userId", { userId })
          .getMany();
        return announcements;
      }
    }
    const announcements = await announcementsRepository
      .createQueryBuilder("announcement")
      .where("announcement.userId = :userId", { userId })
      .andWhere("announcement.isActive = :isActive", { isActive: true })
      .getMany();
    return announcements;
  } catch (error) {
    throw new AppError(`error: Internal server error: ${error}`);
  }
};
export default listUserAnnouncementsService;
