import {ADD_MESSAGE} from './types';

export default function addMessage (message){
    return{
        type: ADD_MESSAGE,
        message
    }
    
}