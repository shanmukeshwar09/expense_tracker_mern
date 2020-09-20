import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App/App";
import "./index.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./Redux/Reducer";
import { LOCALSTORAGEKEY } from "./Redux/Constants";
import { clearForm } from "./Redux/Actions";
const store = createStore(reducer);

store.dispatch(clearForm());

store.subscribe(() => {
  console.log(store.getState());
  localStorage.setItem(LOCALSTORAGEKEY, JSON.stringify(store.getState()));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
