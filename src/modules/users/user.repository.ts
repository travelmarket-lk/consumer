import "server-only";

import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { getDbPool } from "@/lib/db/pool";
import type { CreateUserInput, User } from "./user.types";

type UserRow = RowDataPacket & {
  id: string;
  username: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  account_non_expired: Buffer | number;
  account_non_locked: Buffer | number;
  credentials_non_expired: Buffer | number;
  enabled: Buffer | number;
};

function toBoolean(value: Buffer | number) {
  return Buffer.isBuffer(value) ? value[0] === 1 : value === 1;
}

function mapUser(row: UserRow): User {
  return {
    id: row.id,
    username: row.username,
    email: row.email,
    firstName: row.first_name,
    lastName: row.last_name,
    accountNonExpired: toBoolean(row.account_non_expired),
    accountNonLocked: toBoolean(row.account_non_locked),
    credentialsNonExpired: toBoolean(row.credentials_non_expired),
    enabled: toBoolean(row.enabled),
  };
}

export async function listUsers(limit: number, offset: number) {
  const [rows] = await getDbPool().execute<UserRow[]>(
    `SELECT id, username, email, first_name, last_name,
            account_non_expired, account_non_locked, credentials_non_expired, enabled
     FROM users ORDER BY id DESC LIMIT ? OFFSET ?`,
    [limit, offset],
  );
  return rows.map(mapUser);
}

export async function createUser(input: CreateUserInput) {
  const [result] = await getDbPool().execute<ResultSetHeader>(
    `INSERT INTO users
      (account_non_expired, account_non_locked, credentials_non_expired, enabled,
       username, email, first_name, last_name)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [1, 1, 1, 1, input.username, input.email ?? null, input.firstName ?? null, input.lastName ?? null],
  );
  const [rows] = await getDbPool().execute<UserRow[]>(
    `SELECT id, username, email, first_name, last_name,
            account_non_expired, account_non_locked, credentials_non_expired, enabled
     FROM users WHERE id = ?`,
    [result.insertId],
  );
  return rows[0] ? mapUser(rows[0]) : null;
}
