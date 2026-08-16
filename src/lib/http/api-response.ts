import { NextResponse } from "next/server";
import { ApiError, getErrorMessage } from "@/lib/http/api-error";

export function success<T>(data: T, status = 200) {
  return NextResponse.json({ data }, { status });
}

export function failure(error: unknown) {
  const apiError = error instanceof ApiError ? error : null;
  const status = apiError?.statusCode ?? 500;

  if (status >= 500) console.error(error);

  return NextResponse.json(
    {
      error: {
        code: apiError?.code ?? "INTERNAL_SERVER_ERROR",
        message:
          status >= 500 ? "An unexpected error occurred" : apiError?.message ?? getErrorMessage(error),
      },
    },
    { status },
  );
}
