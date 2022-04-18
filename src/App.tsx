import React from "react";
import logo from "./exercise_graphic.svg";
import "./App.css";

function App() {
  const onDone = () => {
    if (window != null && window.top != null) {
      const message = window.location.href + ";complete;-";
      console.log(message);
      window.top.postMessage(message, "*");
    }
  };
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <div className="App-button-wrapper">
        <button className="App-button" type="button" onClick={onDone}>
          Done
        </button>
      </div>
    </div>
  );
}

export default App;
