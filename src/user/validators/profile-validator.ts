import * as z from "zod";
import { User } from "../models/user";
import { Profile } from "@user/models/profile";

export const nameValidator = z
  .string()
  .min(1, "The field is required")
  .refine( name =>
    !/[!@#$%^&*(),.?":{}|<>]/.test(name),
    "Name cannot have special characters")
  .refine(name =>
    !/\d/.test(name),
    "Name cannot have digits"
  )

const profileSchema = z.object({
  first_name: nameValidator,
  surname: nameValidator,
  username: z
    .string()
    .min(1, "The field is required")
    .max(24, "The max characters of this field is 24"),
  image: z.string().optional()
});

export function validateProfile(profile: unknown): Profile {
  const validProfile = profileSchema.parse(profile);
  return validProfile;
}