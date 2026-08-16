import { failure, success } from "@/lib/http/api-response";
import { getUsers, registerUser } from "@/modules/users/user.service";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get("page") ?? 1) || 1);
    const pageSize = Math.min(100, Math.max(1, Number(searchParams.get("pageSize") ?? 20) || 20));
    return success({ items: await getUsers(page, pageSize), page, pageSize });
  } catch (error) {
    return failure(error);
  }
}

export async function POST(request: Request) {
  try {
    return success(await registerUser(await request.json()), 201);
  } catch (error) {
    return failure(error);
  }
}
