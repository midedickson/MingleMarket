import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.css";
import authReducer from "./store/reducers/auth";
import navReducer from "./store/reducers/nav";
import msgReducer from "./store/reducers/message";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
function configureStore() {
  const rootReducer = combineReducers({
    auth: authReducer,
    nav: navReducer,
    message: msgReducer,
  });
  const store = createStore(
    rootReducer,
    composeEnhances(applyMiddleware(thunk))
  );

  return store;
}

const store = configureStore();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
