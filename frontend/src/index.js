import React from "react"; // Import main react library
import ReactDOM from "react-dom"; // Import react library for render react code

import App from "./App"; // Import react module App

import './style.css'; // Import main styles


ReactDOM.render(
    <App />, // render application
    document.getElementById("main") // Where code render
);
