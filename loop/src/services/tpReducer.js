import { UPDATE_TOUCH_POINTS } from "./actions";

const INITIAL_DATA = {
    value: 0
};

const tpReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case UPDATE_TOUCH_POINTS:
      return {
        value: action.value
      };
    default:
      return state;
  }
};

export default tpReducer;