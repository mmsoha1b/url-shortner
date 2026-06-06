import { z } from "zod";

export const createUrlSchema = z.object({
  url: z.string().url(),
}).passthrough();

export const getUrlParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
}).passthrough();
