import { z } from "zod";

export const createUrlSchema = z.object({
  url: z.string().url(),
}).passthrough();

export const getUrlParamsSchema = z.object({
  id: z.string().regex(/^[a-zA-Z0-9]+$/, "id must be a base62 string"),
}).passthrough();
