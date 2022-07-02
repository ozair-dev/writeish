import { combineReducers } from "redux";

import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import storage from "redux-persist/lib/storage";

import userReducer from "./user";
import settingsReducer from "./settings";
import documentsReducer from "./documents";

const settingsPersistConfig = {
  key: "settings",
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["filters"],
};

const rootPersistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["documents", "settings"],
};

const rootReducer = combineReducers({
  user: userReducer,
  settings: persistReducer(settingsPersistConfig, settingsReducer),
  documents: documentsReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default persistedReducer;
