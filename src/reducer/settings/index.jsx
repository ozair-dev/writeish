import { DARK_MODE_TOGGLED, SET_FILTERS } from "./actions.types";

const initialState = {
  darkMode: false,
  filters: {
    field: "createdAt",
    order: -1,
  },
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DARK_MODE_TOGGLED: {
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    }

    case SET_FILTERS: {
      return {
        ...state,
        filters: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const selectDarkMode = (state) => state.settings.darkMode;

export const selectFilters = (state) => state.settings.filters;

export default settingsReducer;
