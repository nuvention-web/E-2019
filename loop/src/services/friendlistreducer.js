import { UPDATE_FRIENDS_LIST } from "./actions";
import { DELETE_ONE_FRIENDS } from "./actions";

const INITIAL_DATA = {
  friendlist:[]
};

const friendReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case UPDATE_FRIENDS_LIST:
      return {
        ...state,
        friendlist: state.friendlist.concat(action.friend)
      };
    case DELETE_ONE_FRIENDS:
      return{
        ...state,
        friendlist: state.friendlist.filter(i => i.id !== action.friend.id)
      };
    default:
      return state;
  }
};

export default friendReducer;