import { combineReducers } from "redux";
import modalReducer from "./reducers.js";
import friendReducer from "./friendlistreducer";

export default combineReducers({
    modalReducer,
    friendReducer
});