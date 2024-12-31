import * as z from "zod";

export type CreatePost = {
  description: string | undefined
}

const postSchema = z.object({
  description: z.string().optional(),
})
.transform(obj => ({
  description: obj.description
}))



export function validateCreatePost(profile: unknown): CreatePost {
  return postSchema.parse(profile);
}