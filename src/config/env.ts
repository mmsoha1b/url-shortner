import "dotenv/config";

const port = Number(process.env.PORT) || 3000;

export const config = {
  port,
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL ?? "",
  baseUrl: process.env.BASE_URL ?? `http://localhost:${port}`,
} as const;
