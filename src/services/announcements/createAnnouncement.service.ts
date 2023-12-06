import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { Announcement, User } from "../../entities";
import {
  iAnnouncementRequest,
  iAnnouncementReturn,
} from "../../interfaces/announcements.interfaces";
import { returnAnnouncementSchema } from "../../schemas/announcements.schemas";
import { AppError } from "../../errors";
import { any } from "zod";

const createAnnouncementService = async (
  req: Request,
  announcementData: iAnnouncementRequest
): Promise<iAnnouncementReturn> => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({ where: { id: req.user.id } });
  if (!user) {
    throw new AppError("User not found!", 404);
  }
  const announcementRepo = AppDataSource.getRepository(Announcement);

  const announcement = announcementRepo.create(announcementData);
  announcement.user = user;
  await announcementRepo.save(announcement);
  const newAnnouncement: iAnnouncementReturn =
    returnAnnouncementSchema.parse(announcement);
  let announcementWithId: { [key: string]: any } = {};
  announcementWithId.userId = announcement.user.id;
  announcementWithId = { ...announcementWithId, ...newAnnouncement };
  return announcementWithId as any;
};

export default createAnnouncementService;
