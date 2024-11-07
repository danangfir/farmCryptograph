import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

async function requestAccount() {
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  } else {
    alert("Please install MetaMask!");
  }
}

requestAccount();

ReactDOM.render(<App />, document.getElementById("root"));
