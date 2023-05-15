import { useState } from "react";

import Header from "./Components/Header/Header";
import Keypad from "./Components/Keypad/Keypad";

import moonIcon from "./assets/moon.png";
import sunIcon from "./assets/sun.png";

import "./App.css";

const usedKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
  104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109, 110,
];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["-", "+", "*", "/"];

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [expression, setExpression] = useState("");
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState("");

  function handleKeyPress(keyCode, key) {
    if (!keyCode) return;
    if (!usedKeyCodes.includes(keyCode)) return;

    if (numbers.includes(key)) {
      if (key === "0") {
        if (expression.length === 0) return;
      }

      setExpression(expression + key);
      calculateResult(expression + key);
    } else if (operators.includes(key)) {

      if (!expression) return;

      const lastChar = expression.slice(-1);
      if (operators.includes(lastChar)) return;
      if (lastChar === ".") return;

      setExpression(expression + key);
    } else if (key === ".") {

      if (!expression) return;

      const lastChar = expression.slice(-1);
      if (!numbers.includes(lastChar)) return;
      
      setExpression(expression + key);
    } else if (keyCode === 8) {
      console.log("backspace", key);
      if (!expression) return;
      setExpression(expression.slice(0, -1));
      calculateResult(expression.slice(0, -1));
    } else if (keyCode === 13) {
      console.log("Enter", key);
      if (!expression) return;
      calculateResult(expression);

      let tempHistory = [...history];
      if (tempHistory.length > 20) tempHistory = tempHistory.splice(0, 1);
      tempHistory.push(expression);
      setHistory(tempHistory);      
      setExpression("");
    }
  }

  const calculateResult = (exp) => {
    if (!exp) {
      setResult("");
      return;
    }
    const lastChar = exp.slice(-1);
    if (!numbers.includes(lastChar)) exp = exp.slice(0, -1);

    const ans = eval(exp).toFixed(2) + "";
    setResult(ans);
  };
  return (
    <div
      className="app"
      tabIndex={0}
      onKeyDown={(e) => handleKeyPress(e.keyCode, e.key)}
      data-theme={isDarkMode ? "dark" : ""}
    >
      <div className="app_calculator">
        <div className="app_calculator_navbar">
          <div
            className="app_calculator_navbar_toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            <div
              className={`app_calculator_navbar_toggle_circle ${
                isDarkMode ? "app_calculator_navbar_toggle_circle_active" : ""
              }`}
            ></div>
          </div>
          <img src={isDarkMode ? moonIcon : sunIcon} alt="mode" />
        </div>
        <Header expression={expression} history={history} result={result} />
        <Keypad handleKeyPress={handleKeyPress} />
      </div>
    </div>
  );
}

export default App;
