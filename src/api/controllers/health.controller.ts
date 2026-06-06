import type { Request, Response } from "express";

/**
 * GET /api/v1/healthcheck
 * Returns service status and the current server datetime.
 */
export function healthcheck(_req: Request, res: Response): void {
  res.status(200).json({
    status: "ok",
    datetime: new Date().toISOString(),
  });
}
