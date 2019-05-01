import { UPDATE_MODAL_STATUS } from "./actions";
import { UPDATE_JOURNEY_STATUS } from "./actions";

const INITIAL_DATA = {
  show: false,
  empty:true
};

const modalReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case UPDATE_MODAL_STATUS:
      return {
        show: action.show
      };
    case UPDATE_JOURNEY_STATUS:
      return{
        empty: action.empty
      }
    default:
      return state;
  }
};

export default modalReducer;