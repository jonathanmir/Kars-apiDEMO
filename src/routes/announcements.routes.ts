import { Router } from "express";
import {
  createAnnouncementController,
  listAnnouncementsController,
  listDistinctValueController,
  listUserAnnouncementsController,
  removeAnnouncementController,
  retrieveAnnouncementController,
  updateAnnouncementController,
} from "../controllers/announcements.controller";
import {
  annoucementSchema,
  updatableFieldsSchema,
} from "../schemas/announcements.schemas";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { verifyTokenIsValid } from "../middlewares/validatedToken.middleware";
import { verifyUserTyper } from "../middlewares/verifyTypeUser.middleware";

const announcementsRoutes: Router = Router();

announcementsRoutes.post(
  "",
  verifyTokenIsValid,
  ensureDataIsValidMiddleware(annoucementSchema),
  createAnnouncementController
);
announcementsRoutes.get(
  "/user/:userId",
  listUserAnnouncementsController
);
announcementsRoutes.get("/distinct", listDistinctValueController);
announcementsRoutes.get("", listAnnouncementsController);
announcementsRoutes.get("/:id", retrieveAnnouncementController);

announcementsRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(updatableFieldsSchema),
  updateAnnouncementController
);
announcementsRoutes.delete("/:id", removeAnnouncementController);

export { announcementsRoutes };
