import { z } from "zod";

export const createShortUrlSchema = z.object({
  url: z.string().trim().url("Enter a valid URL, including http:// or https://"),
  slug: z
    .string()
    .trim()
    .min(3, "Custom slug must be at least 3 characters")
    .max(30, "Custom slug must be under 30 characters")
    .regex(/^[a-zA-Z0-9-_]+$/, "Slug can only contain letters, numbers, hyphens and underscores")
    .optional()
    .or(z.literal("").transform(() => undefined)),
});
