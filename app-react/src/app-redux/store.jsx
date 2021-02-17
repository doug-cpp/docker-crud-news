import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from "redux";
import layout from "./reducers/layoutReducer";
import newsList from "./reducers/newsListReducer";
import authUser from "./reducers/authReducer";

const reducers = combineReducers({
    layout,
    newsList,
    authUser
});

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

export default store;