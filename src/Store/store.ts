import { applyMiddleware, legacy_createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { USERSReducer } from "./Users/Users.reducer";

const rootReducer = combineReducers({
  users: USERSReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
