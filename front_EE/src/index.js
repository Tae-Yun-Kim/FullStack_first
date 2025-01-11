import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render
(
  //공급하는 이름은 스토어
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
