import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Request, Response } from "express";
import { config } from "../../config/env.js";
import { UrlMapRepository } from "../../db/urlMap.repository.js";

const repo = new UrlMapRepository();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function getUrl(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
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
    const shortUrl = `${config.baseUrl}/api/v1/url/${newUrlMap.id}`;
    res.status(201).json({ message: "success", data: { id: newUrlMap.id, shortUrl } });
  } catch {
    res.status(500).json({ message: "error" });
  }
}
