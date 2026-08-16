import { checkDatabaseConnection } from "@/lib/db/pool";
import { failure, success } from "@/lib/http/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await checkDatabaseConnection();
    return success({ status: "ready", checks: { database: "ok" } });
  } catch (error) {
    return failure(error);
  }
}
