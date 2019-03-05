import { ADD_MESSAGE } from '../actions/types';

const INITIAL_DATA = {
    message : "",
}

const messageReducer = (state = INITIAL_DATA, action) =>{
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                message: action.message
            };
        default:
            return state;
    }
};

export default messageReducer;