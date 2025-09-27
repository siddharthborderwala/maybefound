import { user } from "./user";
import { session } from "./session";
import { account } from "./account";
import { verification } from "./verification";

export const authSchema = {
  user,
  session,
  account,
  verification,
};

export const appSchema = {
  user,
};

export const schema = {
  ...authSchema,
  ...appSchema,
};
