import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Announcement } from "../../entities";
import { iAnnouncementReturn } from "../../interfaces/announcements.interfaces";
import { AppError } from "../../errors";

const retriveAnnouncementService = async (
  id: string
): Promise<iAnnouncementReturn> => {
  const announcementRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);
  const findAnnouncement = await announcementRepository.findOneBy({
    id: id,
  });
  if (!findAnnouncement) {
    throw new AppError("Announcement not found", 404);
  } 
  return findAnnouncement;
};

export default retriveAnnouncementService;
