import { z } from "zod";
import { Announcement } from "../entities";

const schemaCreateComment = z.object({
  user: z.string(),
  announcement: z.string(),
  content: z.string(),
});

const schemaComment = schemaCreateComment.extend({
  id: z.string().uuid(),
  createdAt: z.date(),
});

const schemaUpdateComment = z.object({
  content: z.string(),
})

export { schemaComment, schemaCreateComment, schemaUpdateComment };
