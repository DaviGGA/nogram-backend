import * as z from "zod";

export type CreateComment = {
  text: string 
}

const commentSchema = z.object({
  text: z.string().max(256),
})

export function validateCreateComment(comment: unknown): CreateComment {
  return commentSchema.parse(comment);
}