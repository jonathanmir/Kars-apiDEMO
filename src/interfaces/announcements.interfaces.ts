import { z } from "zod";
import {
  annoucementSchema,
  announcementsListSchema,
  returnAnnouncementSchema,
} from "../schemas/announcements.schemas";

type iAnnouncementRequest = z.infer<typeof annoucementSchema>;

type iAnnouncementReturn = z.infer<typeof returnAnnouncementSchema>;
type iListAnnouncements = z.infer<typeof announcementsListSchema>;
type iAnnouncementsListReturn = z.infer<typeof announcementsListSchema>;

enum AvailableParams {
  brand = "brand",
  model = "model",
  color = "color",
  fuelType = "fuelType",
  mileage = "mileage",
  year = "year",
  sellPrice = "sellPrice",
}
export {
  iAnnouncementRequest,
  iAnnouncementReturn,
  iListAnnouncements,
  iAnnouncementsListReturn,
  AvailableParams,
};
