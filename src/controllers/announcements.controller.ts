import { Request, Response, NextFunction } from "express";
import {
  AvailableParams,
  iAnnouncementRequest,
  iAnnouncementReturn,
} from "../interfaces/announcements.interfaces";
import createAnnouncementService from "../services/announcements/createAnnouncement.service";
import retriveAnnouncementService from "../services/announcements/retrieveAnnouncement.service";
import listAnnouncementsService from "../services/announcements/listAnnouncements.service";
import removeAnnouncementService from "../services/announcements/removeAnnouncement.service";
import updateAnnouncementService from "../services/announcements/updateAnnouncement.service";
import listAvailableFilters from "../services/announcements/listAvailableFilters.service";
import listUserAnnouncementsService from "../services/announcements/retrieveUserAnnouncements.service";

const createAnnouncementController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  console.log(req.user);
  const announcement: iAnnouncementReturn = await createAnnouncementService(
    req,
    req.body
  );
  return res.status(201).send(announcement);
};

const retrieveAnnouncementController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const announcement: iAnnouncementReturn = await retriveAnnouncementService(
    req.params.id
  );
  return res.status(200).send(announcement);
};

const listAnnouncementsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let order = req.query.order as `ASC` | `DESC`;
  let sort: any = req.query.sort as AvailableParams;
  if (order?.toUpperCase() != `DESC` || !order) {
    order = `ASC`;
  }
  if (
    typeof sort?.toUpperCase() != `string` ||
    !Object.values(AvailableParams).includes(sort as AvailableParams)
  ) {
    sort = `brand`;
  }
  const announcements = await listAnnouncementsService(
    Number(req.query.page),
    Number(req.query.perPage),
    order,
    sort,
    req
  );
  return res.status(200).send(announcements);
};

const listDistinctValueController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const values = await listAvailableFilters(req);
  return res.status(200).send(values);
};

const listUserAnnouncementsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const announcements = await listUserAnnouncementsService(
    req.params.userId as string,
    req
  );
  return res.status(200).send(announcements);
};
const updateAnnouncementController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const announcement = await updateAnnouncementService(req.params.id, req.body);
  return res.status(200).send(announcement);
};

const removeAnnouncementController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const remove = await removeAnnouncementService(req.params.id);
  return res.status(204).send();
};
export {
  createAnnouncementController,
  retrieveAnnouncementController,
  listAnnouncementsController,
  listDistinctValueController,
  listUserAnnouncementsController,
  updateAnnouncementController,
  removeAnnouncementController,
};

