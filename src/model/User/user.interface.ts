import { USER_ROLE } from "./user.constant";

type Roles = keyof typeof USER_ROLE;

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: Roles;
}
