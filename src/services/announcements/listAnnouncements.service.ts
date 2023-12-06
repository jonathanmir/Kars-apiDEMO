import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { Announcement } from "../../entities";
import {
  AvailableParams,
  iAnnouncementReturn,
  iAnnouncementsListReturn,
} from "../../interfaces/announcements.interfaces";
import { AppError } from "../../errors";
import { Repository } from "typeorm";

interface iPagination {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: iAnnouncementReturn[];
}

const pagination = async (
  page: number,
  perPage: number,
  count: number,
  data: iAnnouncementsListReturn
): Promise<iPagination | []> => {
  const baseUrl = `http://localhost:3000/announcements`;
  const maxPage = Math.floor(count / perPage + 1);

  let prevPage: string | null = `${baseUrl}?page=${
    page - 1
  }&perPage=${perPage}`;
  let nextPage: string | null = `${baseUrl}?page=${
    page + 1
  }&perPage=${perPage}`;
  if (page === 1) {
    prevPage = null;
  }
  if (page === maxPage || page > maxPage) {
    nextPage = null;
  }
  let pagination: iPagination | [] = {
    prevPage,
    nextPage,
    count,
    data,
  };

  return pagination;
};

const listAnnouncementsService = async (
  page: number,
  perPage: number,
  order: `ASC` | `DESC`,
  sortBy: AvailableParams,
  req: Request
): Promise<iPagination | Announcement[]> => {
  let ordering: { [key: string]: `ASC` | `DESC` } = {};
  ordering[sortBy as string] = order;
  const announcementsRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);
  const query = announcementsRepository.createQueryBuilder("announcement");

  let perPageConfig;
  let pageConfig;
  if (page && perPage) {
    perPageConfig = perPage;
    pageConfig = page;
    if (perPage <= 0) {
      perPageConfig = 10;
    }
    if (page <= 0 || !page) {
      pageConfig = 1;
    }
    const announcementsQuery = query
      .take(perPageConfig)
      .skip(perPageConfig * (pageConfig - 1))
      .orderBy(ordering);
  }
  if (req.query) {
    let availableParams = [
      "brand",
      "model",
      "color",
      "fuelType",
      "mileage",
      "year",
      "sellPrice",
    ];
    availableParams.forEach((param) => {
      if (req.query[param]) {
        if (param === "fuelType") {
          query.andWhere(`announcement.${param} = :${param}`, {
            [param]: parseInt(req.query[param] as string, 10),
          });
        } else if (param === "mileage") {
          const { min, max } = req.query[param] as {
            min?: string;
            max?: string;
          };
          if (min) {
            query.andWhere(`announcement.${param} >= :minMileage`, {
              minMileage: parseInt(min as string, 10),
            });
          }
          if (max) {
            query.andWhere(`announcement.${param} <= :maxMileage`, {
              maxMileage: parseInt(max as string, 10),
            });
          }
        } else if (param === "sellPrice") {
          const { min, max } = req.query[param] as {
            min?: string;
            max?: string;
          };
          if (min) {
            query.andWhere(`announcement.${param} >= :minSellPrice`, {
              minSellPrice: parseInt(min as string, 10),
            });
          }
          if (max) {
            query.andWhere(`announcement.${param} <= :maxSellPrice`, {
              maxSellPrice: parseInt(max as string, 10),
            });
          }
        } else {
          query.andWhere(`announcement.${param} ILike :${param}`, {
            [param]: `%${req.query[param]}%`,
          });
        }
      }
    });
  }
  try {
    let announcements: any;
    if (pageConfig && perPageConfig) {
      announcements = await query.getManyAndCount();
      const paginatedResults = await pagination(
        pageConfig,
        perPageConfig,
        announcements[1],
        announcements[0]
      );

      return paginatedResults;
    } else {
      announcements = query
        .orderBy(ordering)
        .innerJoin("announcement.user", "User", "User.id = announcement.userId")
        .select(["announcement", "User.id", "User.name"])
        .getMany();
      return announcements;
    }
  } catch (err) {
    throw new AppError(`error: ${err}`, 500);
  }
};

export default listAnnouncementsService;
