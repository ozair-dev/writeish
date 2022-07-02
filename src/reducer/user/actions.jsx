import { USER_UPDATED } from "./actions.types";

export const updateUser = (user) => {
  return { type: USER_UPDATED, payload: user };
};
