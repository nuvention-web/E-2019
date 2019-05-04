import { USER_INFO } from "./actions";

const INITIAL_DATA = {
  user:{}
};

const userReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case USER_INFO:
      return {
        user: action.user
      };
    default:
      return state;
  }
};

export default userReducer;