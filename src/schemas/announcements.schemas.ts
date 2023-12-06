import { z } from "zod";

const imagesSchema = z.object({
  id: z.number(),
  announcementId: z.number(),
});

enum fuelType {
  Gasoline = 1,
  Ethanol = 2,
  Flex = 3,
}
const annoucementSchema = z.object({
  brand: z.string().max(50),
  model: z.string().max(100),
  year: z.string().max(4),
  fuelType: z.nativeEnum(fuelType),
  mileage: z.string().max(100),
  color: z.string().max(100),
  fipePrice: z.number().gt(0),
  sellPrice: z.union([z.number().gt(0), z.string()]),
  description: z.string(),
  coverImage: z.string(),
  isActive: z.boolean().default(true),
});

const returnAnnouncementSchema = annoucementSchema.extend({
  id: z.string(),
});

const updatableFieldsSchema = annoucementSchema.partial().omit({
  brand: true,
  model: true,
  year: true,
  fuelType: true,
  color: true,
  fipePrice: true,
});
const announcementsListSchema = z.array(returnAnnouncementSchema);
export {
  annoucementSchema,
  returnAnnouncementSchema,
  announcementsListSchema,
  updatableFieldsSchema,
};
