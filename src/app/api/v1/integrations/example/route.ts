import { externalApiRequest } from "@/lib/integrations/external-api-client";
import { failure, success } from "@/lib/http/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await externalApiRequest<unknown>("/example");
    return success(data);
  } catch (error) {
    return failure(error);
  }
}

