import { combineReducers } from "redux";
import modalReducer from "./reducers.js";
import friendReducer from "./friendlistreducer";
import dataReducer from "./datareducer";
import userReducer from "./userreducer"

export default combineReducers({
    modalReducer,
    friendReducer,
    dataReducer,
    userReducer
});