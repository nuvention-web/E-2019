import { UPDATE_RESPONSE_RATE } from "./actions";

const INITIAL_DATA = {
    value: 0
};

const rrReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case UPDATE_RESPONSE_RATE:
      return {
        value: action.value
      };
    default:
      return state;
  }
};

export default rrReducer;