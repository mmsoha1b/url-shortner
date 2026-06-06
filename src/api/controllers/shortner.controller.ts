import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Request, Response } from "express";
import { config } from "../../config/env.js";
import { convertFromBase62 } from "../utils/mathHelpers.js";
import { UrlMapRepository } from "../../db/urlMap.repository.js";
import { convertToBase62 } from "../utils/mathHelpers.js";

const repo = new UrlMapRepository();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function getUrl(req: Request, res: Response): Promise<void> {
  try {
    const id = convertFromBase62(req.params.id);
    const record = await repo.findById(id);

    if (!record) {
      res.status(404).sendFile(path.resolve(__dirname, "../../views/404.html"));
      return;
    }

    res.redirect(record.url);
  } catch {
    res.status(500).json({ message: "error" });
  }
}

export async function createUrl(req: Request, res: Response): Promise<void> {
  try {
    const newUrlMap = await repo.create(req.body.url);
    const base62Id = convertToBase62(newUrlMap.id)
    const shortUrl = `${config.baseUrl}/api/v1/url/${base62Id}`;
    res.status(201).json({ message: "success", data: { id: base62Id, shortUrl } });
  } catch {
    res.status(500).json({ message: "error" });
  }
}
