import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Calculator.css"; // File CSS kustom untuk kalkulator
import Navbar from "./Navbar";

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      displayValue: "0",
      previousValue: null,
      operator: null,
      history: [],
    };
  }

  inputDigit = (digit) => {
    const { displayValue, operator, previousValue } = this.state;

    if (digit === "-" && displayValue === "0") {
      this.setState({ displayValue: "-" });
    } else if (
      displayValue === "0" ||
      (operator !== null && previousValue !== null)
    ) {
      this.setState({ displayValue: digit });
    } else {
      this.setState({ displayValue: displayValue + digit });
    }
  };

  inputDecimal = () => {
    const { displayValue } = this.state;
    if (!displayValue.includes(".")) {
      this.setState({ displayValue: displayValue + "." });
    }
  };

  clearDisplay = () => {
    this.setState({
      displayValue: "0",
      previousValue: null,
      operator: null,
    });
  };

  deleteLastDigit = () => {
    const { displayValue } = this.state;
    let newValue = displayValue.slice(0, -1);
    if (newValue === "") {
      newValue = "0";
    }
    this.setState({ displayValue: newValue });
  };

  performOperation = (nextOperator) => {
    const { displayValue, previousValue, operator } = this.state;
    const inputValue = parseFloat(displayValue);

    if (operator && previousValue !== null) {
      const currentValue = previousValue;

      switch (operator) {
        case "+":
          this.setState({
            displayValue: (currentValue + inputValue).toString(),
          });
          break;
        case "-":
          this.setState({
            displayValue: (currentValue - inputValue).toString(),
          });
          break;
        case "*":
          this.setState({
            displayValue: (currentValue * inputValue).toString(),
          });
          break;
        case "/":
          this.setState({
            displayValue: (currentValue / inputValue).toString(),
          });
          break;
        case "%":
          this.setState({
            displayValue: ((currentValue / 100) * inputValue).toString(),
          });
          break;
        default:
          break;
      }
      this.addToHistory(
        `${currentValue} ${operator} ${inputValue} = ${this.state.displayValue}`
      );
    } else {
      this.setState({
        previousValue: inputValue,
      });
    }

    this.setState({
      operator: nextOperator,
    });
  };

  addToHistory = (expression) => {
    this.setState((prevState) => ({
      history: [...prevState.history, expression],
    }));
  };

  clearHistory = () => {
    this.setState({ history: [] });
  };

  render() {
    const { displayValue, history } = this.state;

    return (
      <div className="calculator">
        <Navbar />
        <div className="container calculator-body">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div className="display">{displayValue}</div>
              <div className="history">
                {history.map((expression, index) => (
                  <div key={index} className="expression">
                    {expression}
                  </div>
                ))}
              </div>
              <div className="buttons">
                <div className="row">
                  <button
                    className="btn btn-secondary col"
                    onClick={() => this.inputDigit("7")}
                  >
                    7
                  </button>
                  <button
                    className="btn btn-secondary col"
                    onClick={() => this.inputDigit("8")}
                  >
                    8
                  </button>
                  <button
                    className="btn btn-secondary col"
                    onClick={() => this.inputDigit("9")}
                  >
                    9
                  </button>
                  <button
                    className="btn btn-warning col operator"
                    onClick={() => this.performOperation("/")}
                  >
                    ÷
                  </button>
                </div>
                <div className="row">
                  <button
                    className="btn btn-secondary col"
                    onClick={() => this.inputDigit("4")}
                  >
                    4
                  </button>
                  <button
                    className="btn btn-secondary col"
                    onClick={() => this.inputDigit("5")}
                  >
                    5
                  </button>
                  <button
                    className="btn btn-secondary col"
                    onClick={() => this.inputDigit("6")}
                  >
                    6
                  </button>
                  <button
                    className="btn btn-warning col operator"
                    onClick={() => this.performOperation("*")}
                  >
                    ×
                  </button>
                </div>
                <div className="row">
                  <button
                    className="btn btn-secondary col"
                    onClick={() => this.inputDigit("1")}
                  >
                    1
                  </button>
                  <button
                    className="btn btn-secondary col"
                    onClick={() => this.inputDigit("2")}
                  >
                    2
                  </button>
                  <button
                    className="btn btn-secondary col"
                    onClick={() => this.inputDigit("3")}
                  >
                    3
                  </button>
                  <button
                    className="btn btn-warning col operator"
                    onClick={() => this.performOperation("-")}
                  >
                    -
                  </button>
                </div>
                <div className="row">
                  <button
                    className="btn btn-secondary col"
                    onClick={() => this.inputDigit("0")}
                  >
                    0
                  </button>
                  <button
                    className="btn btn-secondary col"
                    onClick={this.inputDecimal}
                  >
                    .
                  </button>
                  <button
                    className="btn btn-success col operator"
                    onClick={() => this.performOperation("+")}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-info col operator"
                    onClick={() => this.performOperation("%")}
                  >
                    %
                  </button>
                  <button
                    className="btn btn-danger col clear"
                    onClick={this.clearDisplay}
                  >
                    C
                  </button>
                  <button
                    className="btn btn-primary col equals"
                    onClick={() => this.performOperation("=")}
                  >
                    =
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
