import { combineReducers } from "redux";
import modalReducer from "./reducers.js";
import friendReducer from "./friendlistreducer";
import dataReducer from "./datareducer";
import userReducer from "./userreducer"
import tpReducer from "./tpReducer"
import rrReducer from "./resratereducer"
export default combineReducers({
    modalReducer,
    friendReducer,
    dataReducer,
    userReducer,
    tpReducer,
    rrReducer
});