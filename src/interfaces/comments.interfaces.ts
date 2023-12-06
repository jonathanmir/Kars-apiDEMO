import { z } from 'zod';
import { schemaCreateComment, schemaComment } from '../schemas/comments.schema';
import { DeepPartial, Repository } from 'typeorm';
import { Comment } from '../entities';


type ICommentRequest = z.infer<typeof schemaCreateComment>;
type ICommentReturn = z.infer<typeof schemaComment>;
type iCommentRepo = Repository<Comment>;

export {ICommentRequest, ICommentReturn, iCommentRepo}
