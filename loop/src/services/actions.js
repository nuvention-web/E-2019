export const UPDATE_MODAL_STATUS = "UPDATE_MODAL_STATUS";
export const UPDATE_JOURNEY_STATUS = "UPDATE_JOURNEY_STATUS";
export const GET_USER = "GET_USER";
export const UPDATE_FRIENDS_LIST = "UPDATE_FRIENDS_LIST"
export const DELETE_ONE_FRIENDS = "DELETE_ONE_FRIENDS"

export const updateModalStatus = (show) => ({
  type: UPDATE_MODAL_STATUS,
  show
});

export const updateJourneyStatus = (empty) => ({
  type: UPDATE_JOURNEY_STATUS,
  empty
});

export const updateFriendList = (friend) => ({
  type: UPDATE_FRIENDS_LIST,
  friend
});

export const deleteOneFriend = (friend) => ({
  type: DELETE_ONE_FRIENDS,
  friend
});

export const getUser = (email) => ({
  type: GET_USER,
  email
});