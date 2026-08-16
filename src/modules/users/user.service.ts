import "server-only";

import { z } from "zod";
import { ApiError } from "@/lib/http/api-error";
import { createUser, listUsers } from "./user.repository";

export const createUserSchema = z.object({
  username: z.string().trim().min(1).max(255),
  email: z.string().trim().email().max(255).nullable().optional(),
  firstName: z.string().trim().max(255).nullable().optional(),
  lastName: z.string().trim().max(255).nullable().optional(),
});

export async function getUsers(page: number, pageSize: number) {
  return listUsers(pageSize, (page - 1) * pageSize);
}

export async function registerUser(input: unknown) {
  const result = createUserSchema.safeParse(input);
  if (!result.success) throw new ApiError("Invalid request body", 400, "VALIDATION_ERROR");

  try {
    const user = await createUser(result.data);
    if (!user) throw new ApiError("User could not be created", 500);
    return user;
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ER_DUP_ENTRY") {
      throw new ApiError("A user with this email already exists", 409, "EMAIL_ALREADY_EXISTS");
    }
    throw error;
  }
}
