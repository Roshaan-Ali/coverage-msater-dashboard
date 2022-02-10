import React from "react";
import ReactDOM from "react-dom";
import "react-toastify/dist/ReactToastify.css";
import "./style/style.css";
// import './style/newstyle.css';
import "./links/fontawesome/css/all.css";
import "./style/keyframes.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'react-loading-skeleton/dist/skeleton.css'
import "react-calendar/dist/Calendar.css";
import "cropperjs/dist/cropper.css";
import "./style/coverbook.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
