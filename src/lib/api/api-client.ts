import type { ApiResponse } from "@/types/api.types";

export async function apiClient<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, { ...init, headers: { Accept: "application/json", ...init?.headers } });
  const body = (await response.json()) as ApiResponse<T>;
  if (!response.ok) throw new Error(body.error?.message ?? "Request failed");
  if (!("data" in body) || body.data === undefined) throw new Error("Invalid API response");
  return body.data as T;
}
