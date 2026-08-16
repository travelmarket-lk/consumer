import "server-only";

import mysql, { type Pool } from "mysql2/promise";
import { getDatabaseEnv } from "@/lib/config/env";
import { ApiError } from "@/lib/http/api-error";

const globalForDb = globalThis as unknown as { mysqlPool?: Pool };

export function getDbPool(): Pool {
  if (globalForDb.mysqlPool) return globalForDb.mysqlPool;

  const env = getDatabaseEnv();
  const pool = mysql.createPool({
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    database: env.DATABASE_NAME,
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    connectionLimit: env.DATABASE_CONNECTION_LIMIT,
    waitForConnections: true,
    enableKeepAlive: true,
    charset: "utf8mb4",
    supportBigNumbers: true,
    bigNumberStrings: true,
  });

  if (env.NODE_ENV !== "production") globalForDb.mysqlPool = pool;
  return pool;
}

export async function checkDatabaseConnection() {
  try {
    const connection = await getDbPool().getConnection();
    try {
      await connection.ping();
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Database readiness check failed", error);
    throw new ApiError("Database is unavailable", 503, "DATABASE_UNAVAILABLE");
  }
}
