import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

import { useAuth } from "./utils/firebase.utils";

import store, { persistor } from "./store";
import { updateUser } from "./reducer/user/actions";

useAuth((user) => {
  store.dispatch(updateUser(user));
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
