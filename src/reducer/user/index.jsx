import { USER_UPDATED } from "./actions.types";

const initialState = {
  status: "idle",
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_UPDATED: {
      return {
        ...state,
        status: "succeeded",
        user: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export const selectUser = (state) => state.user.user;
export const selectUserStatus = (state) => state.user.status;

export default userReducer;
