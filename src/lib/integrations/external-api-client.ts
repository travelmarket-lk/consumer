import "server-only";

import { getExternalApiEnv } from "@/lib/config/env";
import { ApiError } from "@/lib/http/api-error";

const DEFAULT_TIMEOUT_MS = 8_000;

export async function externalApiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const env = getExternalApiEnv();
  const baseUrl = env.EXTERNAL_API_BASE_URL.endsWith("/")
    ? env.EXTERNAL_API_BASE_URL
    : `${env.EXTERNAL_API_BASE_URL}/`;
  const url = new URL(path.replace(/^\//, ""), baseUrl);
  const headers = new Headers(init?.headers);
  headers.set("Accept", "application/json");
  if (env.EXTERNAL_API_TOKEN) headers.set("Authorization", `Bearer ${env.EXTERNAL_API_TOKEN}`);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);
  try {
    const response = await fetch(url, { ...init, headers, signal: controller.signal, cache: "no-store" });
    if (!response.ok) {
      throw new ApiError("External service request failed", 502, "EXTERNAL_SERVICE_ERROR");
    }
    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError("External service is unavailable", 502, "EXTERNAL_SERVICE_UNAVAILABLE");
  } finally {
    clearTimeout(timeout);
  }
}
