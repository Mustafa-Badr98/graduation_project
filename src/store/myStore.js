import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// import languageReducer from "./reducer";
import CombineReducer from "./reducers/CombineReducer";
import thunk from "redux-thunk";

const MyStore = createStore(
  CombineReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default MyStore;