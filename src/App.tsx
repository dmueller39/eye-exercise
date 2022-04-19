import React, { useState, useEffect } from "react";
import logo from "./exercise_graphic.svg";
import "./App.css";

function Counter({
  onDone,
  onStart,
  isStarted,
  isComplete,
  counter,
}: {
  onDone: () => void;
  onStart: () => void;
  isComplete: boolean;
  isStarted: boolean;
  counter: number;
}) {
  if (!isStarted) {
    return (
      <button className="App-button" type="button" onClick={onStart}>
        Start
      </button>
    );
  }
  if (isComplete) {
    return (
      <button className="App-button" type="button" onClick={onDone}>
        Done
      </button>
    );
  }
  return <span>{counter}</span>;
}

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [counter, setCounter] = useState(30);
  useEffect(() => {
    const interval = setInterval(() => {
      if (isStarted && !isComplete) {
        const c = Math.ceil(30.0 - (Date.now() - startTime) / 1000);
        setCounter(c);
        if (c <= 0) {
          setIsComplete(true);
        }
      }
    }, 40);
    return () => clearInterval(interval);
  }, [isStarted, isComplete, startTime]);
  const onDone = () => {
    if (window != null && window.top != null) {
      const message = window.location.href + ";complete;-";
      console.log(message);
      window.top.postMessage(message, "*");
    }
  };
  const onStart = () => {
    setStartTime(Date.now());
    setIsStarted(true);
  };
  return (
    <div className="App">
      <div className="App-counter-wrapper">
        <Counter
          onStart={onStart}
          onDone={onDone}
          counter={counter}
          isStarted={isStarted}
          isComplete={isComplete}
        />
      </div>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

export default App;
