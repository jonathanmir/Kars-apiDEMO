import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { Announcement } from "../../entities";
import { AppError } from "../../errors";

const listAvailableFilters = async (req: Request) => {
  const possibleFilters = ["brand", "model", "color", "mileage", "year"];
  try {
    const announcementsRepository = AppDataSource.getRepository(Announcement);
    let resultPromise = possibleFilters.map(async (element) => {
      const distinctValues: any = await announcementsRepository
        .createQueryBuilder("announcement")
        .select(`DISTINCT announcement.${element}`)
        .getRawMany();
      return distinctValues;
    });
    const distinctResult = await Promise.all(resultPromise);
    const transformValues: any = distinctResult.reduce((acc: any, arr: any) => {
      const fieldName = Object.keys(arr[0])[0];
      const distinctValues = arr.map((item: any) => {
        const eachItem: any = Object.values(item)[0];
        return eachItem.charAt(0).toUpperCase() + eachItem.slice(1);
      });
      acc[fieldName] = distinctValues;
      return acc;
    }, {});
    const resultArr = [transformValues];
    return resultArr;
  } catch (error) {
    throw new AppError(`error: Internal server error: ${error}`);
  }
};

export default listAvailableFilters;
