import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from './rootReducers';

export default function configureStore() {
    return createStore(
        rootReducers,
    );
}