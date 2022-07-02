import { createStore, applyMiddleware } from "redux";

import { persistStore } from "redux-persist";

import thunk from "redux-thunk";
import logger from "redux-logger";

import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducer";

const enhancers = composeWithDevTools(applyMiddleware(thunk, logger));

const store = createStore(rootReducer, enhancers);

export const persistor = persistStore(store);

export default store;
