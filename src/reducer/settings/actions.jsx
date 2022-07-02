import { DARK_MODE_TOGGLED, SET_FILTERS } from "./actions.types";

export const toggleDarkMode = () => {
  return { type: DARK_MODE_TOGGLED };
};

export const setFilters = (filters) => {
  return { type: SET_FILTERS, payload: filters };
};
