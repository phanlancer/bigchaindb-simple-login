import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import auth from "./auth";
import app from "./app";

const reducers = combineReducers({
  route: routerReducer,
  app,
  auth
});

export default reducers;
