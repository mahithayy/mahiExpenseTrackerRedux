import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import  store  from "./redux/Store";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// DO NOT TOUCH THE BELOW LINE
import reportWebVitals from "./reportWebVitals";

// DO NOT TOUCH THE BELOW 3 LINES
if (window.Cypress) {
  window.store = store;
}

// WRITE YOUR CODE HERE

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
);

// DO NOT TOUCH THE BELOW LINE
reportWebVitals();


