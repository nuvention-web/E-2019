import { UPDATE_FRIENDS_LIST } from "./actions";

const INITIAL_DATA = {
  friendlist:[]
};

const friendReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case UPDATE_FRIENDS_LIST:
      return {
        friendlist: state.friendlist.push(action.id)
      };
    default:
      return state;
  }
};

export default friendReducer;