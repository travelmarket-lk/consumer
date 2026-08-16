import { z } from "zod";

const commonEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

const databaseEnvSchema = commonEnvSchema.extend({
  DATABASE_HOST: z.string().min(1),
  DATABASE_PORT: z.coerce.number().int().positive().default(3306),
  DATABASE_NAME: z.string().min(1),
  DATABASE_USER: z.string().min(1),
  DATABASE_PASSWORD: z.string(),
  DATABASE_CONNECTION_LIMIT: z.coerce.number().int().positive().default(10),
});

const externalApiEnvSchema = commonEnvSchema.extend({
  EXTERNAL_API_BASE_URL: z.string().url(),
  EXTERNAL_API_TOKEN: z.string().optional(),
});

const rawEnv = {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_CONNECTION_LIMIT: process.env.DATABASE_CONNECTION_LIMIT,
    EXTERNAL_API_BASE_URL: process.env.EXTERNAL_API_BASE_URL,
    EXTERNAL_API_TOKEN: process.env.EXTERNAL_API_TOKEN,
};

export function getDatabaseEnv() {
  return databaseEnvSchema.parse(rawEnv);
}

export function getExternalApiEnv() {
  return externalApiEnvSchema.parse(rawEnv);
}
