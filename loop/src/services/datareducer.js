import { HEATMAP_DATA } from "./actions";

const INITIAL_DATA = {
    data:{}
};

const dataReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case HEATMAP_DATA:
      return {
        data: action.data
      };
    default:
      return state;
  }
};

export default dataReducer;