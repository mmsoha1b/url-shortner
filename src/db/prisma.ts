import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "../config/env.js";
import { PrismaClient } from "../generated/prisma/client.js";

if (!config.databaseUrl) {
  throw new Error("DATABASE_URL is not set. Check your .env file.");
}

const adapter = new PrismaPg({ connectionString: config.databaseUrl });

const prisma = new PrismaClient({ adapter });

export default prisma;
