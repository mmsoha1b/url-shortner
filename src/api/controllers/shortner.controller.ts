import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Request, Response } from 'express';
import { config } from '../../config/env.js';
import { convertFromBase62 } from '../utils/mathHelpers.js';
import { UrlMapRepository } from '../../db/urlMap.repository.js';
import { convertToBase62 } from '../utils/mathHelpers.js';
import redisClient from '../../cache/redisClient.js';

const repo = new UrlMapRepository();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function getUrl(req: Request, res: Response): Promise<void> {
  try {
    let record = null;
    record = await redisClient.get(req.params.id);
    if (record) {
      return res.redirect(record);
    }
    const id = convertFromBase62(req.params.id);

    record = await repo.findById(id);

    if (!record) {
      res.status(404).sendFile(path.resolve(__dirname, '../../views/404.html'));
      return;
    }

    await redisClient.set(req.params.id, record.url);
    res.redirect(record.url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error' });
  }
}

export async function createUrl(req: Request, res: Response): Promise<void> {
  try {
    const newUrlMap = await repo.create(req.body.url);
    const base62Id = convertToBase62(newUrlMap.id);
    const shortUrl = `${config.baseUrl}/api/v1/url/${base62Id}`;
    try {
      await redisClient.set(base62Id, req.body.url);
    } catch (error) {
      console.error('Error when setting redis Cache for url', req.body.url);
      console.error(error);
    }
    res.status(201).json({ message: 'success', data: { id: base62Id, shortUrl } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error' });
  }
}
