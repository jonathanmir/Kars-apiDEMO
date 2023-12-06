import { AppDataSource } from "../../data-source";
import { Announcement } from "../../entities";
import { AppError } from '../../errors';

const removeAnnouncementService = async (id: string): Promise<void> => {
  const announcementRepo = AppDataSource.getRepository(Announcement);
  const findAnnouncement = await announcementRepo.findOne({
    where: {
      id: id,
    },
  });

  if (!findAnnouncement) {
    throw new AppError("Announcement not found", 404);
  }
  
  await announcementRepo.remove(findAnnouncement);
};

export default removeAnnouncementService;
