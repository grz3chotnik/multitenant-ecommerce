import { z } from "zod";

export const loginSchema =  z.object({
      email: z.string().email(),
      password: z.string(),
    })


export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  username: z
    .string()
    .min(3, "username must be at least 3 characters")
    .max(63, "username must be less than 63 characters")
    .regex(
      /^[a-z0-9][a-z0-9]*[a-z0-9]$/,
      "username must only contain lowercase letters, nubmers and hyphens. it must start and end with a letter or a number ",
    )
    .refine(
      (val) => !val.includes("--"),
      "username cannot contain consecutive hyphens",
    )
    .transform((val) => val.toLowerCase()),
  //[username].shop.com
});
