export const UPDATE_MODAL_STATUS = "UPDATE_MODAL_STATUS";
export const UPDATE_JOURNEY_STATUS = "UPDATE_JOURNEY_STATUS";
export const GET_USER = "GET_USER";
export const UPDATE_FRIENDS_LIST = "UPDATE_FRIENDS_LIST"
export const updateModalStatus = (show) => ({
  type: UPDATE_MODAL_STATUS,
  show
});

export const updateJourneyStatus = (empty) => ({
  type: UPDATE_JOURNEY_STATUS,
  empty
});

export const updateFriendList = (id) => ({
  type: UPDATE_FRIENDS_LIST,
  id
});

export const getUser = (email) => ({
  type: GET_USER,
  email
});