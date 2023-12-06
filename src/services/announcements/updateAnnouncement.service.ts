import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Announcement } from "../../entities";
import {
  iAnnouncementRequest,
  iAnnouncementReturn,
} from "../../interfaces/announcements.interfaces";
import { returnAnnouncementSchema } from "../../schemas/announcements.schemas";

const updateAnnouncementService = async (
  id: string,
  announcementData: iAnnouncementRequest
): Promise<iAnnouncementReturn> => {
  const announcementRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);
  const findAnnouncement = await announcementRepository.findOneBy({
    id: id,
  });
  const updatedAnnouncement = announcementRepository.save({
    ...findAnnouncement,
    ...announcementData,
  });
  return updatedAnnouncement;
};

export default updateAnnouncementService;
