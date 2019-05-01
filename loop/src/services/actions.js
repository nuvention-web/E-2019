export const UPDATE_MODAL_STATUS = "UPDATE_MODAL_STATUS";
export const UPDATE_JOURNEY_STATUS = "UPDATE_JOURNEY_STATUS";
export const GET_USER = "GET_USER";

export const updateModalStatus = (show) => ({
  type: UPDATE_MODAL_STATUS,
  show
});

export const updateJourneyStatus = (empty) => ({
  type: UPDATE_JOURNEY_STATUS,
  empty
});

export const getUser = (email) => ({
  type: GET_USER,
  email
});