export type User = {
  id: string;
  username: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
};

export type CreateUserInput = {
  username: string;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
};
