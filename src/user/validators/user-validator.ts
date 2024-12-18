import * as z from "zod";
import { User } from "../models/user";

export const passwordValidator = z
  .string()
  .min(8, "Password must have atleast eight characters")
  .refine( password =>
    /[!@#$%^&*(),.?":{}|<>]/.test(password)
  , "Password must have atleast one special character")
  .refine( password =>
    /\d/.test(password)
  , "Password must contain atleast one digit")

export const emailValidator = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email")

const userSchema = z.object({
  email: emailValidator,
  password: passwordValidator
});

export function validateUser(user: unknown): User {
  const validUser = userSchema.parse(user);
  return validUser;
}