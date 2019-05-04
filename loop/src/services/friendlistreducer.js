import { UPDATE_FRIENDS_LIST } from "./actions";
import { DELETE_ONE_FRIENDS } from "./actions";
import { EMPTY_FRIENDS_LIST } from "./actions";
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
    case EMPTY_FRIENDS_LIST:
      return{
        friendlist:[]
      }
    default:
      return state;
  }
};

export default friendReducer;