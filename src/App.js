import "./App.css";
import { useReducer } from "react";
import DigitButton from "./DigitalButton";
import OperationButton from "./OperationButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand.includes("."))
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.DELETE_DIGIT:
      if (state.currentOperand === "") return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand.slice(0, -1)}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.operation) return state;
      return {
        previousOperand: `${
          (state.previousOperand || "") + state.currentOperand || ""
        }`,
        currentOperand: "",
        operation: payload.operation,
      };

    case ACTIONS.CLEAR:
      return {
        previousOperand: "",
        currentOperand: "",
        operation: "",
      };

    case ACTIONS.EVALUATE:
      let result = "";
      if (state.operation === "+") {
        result =
          parseFloat(state.previousOperand) + parseFloat(state.currentOperand);
      }
      if (state.operation === "-") {
        result =
          parseFloat(state.previousOperand) - parseFloat(state.currentOperand);
      }
      if (state.operation === "*") {
        result =
          parseFloat(state.previousOperand) * parseFloat(state.currentOperand);
      }
      if (state.operation === "÷") {
        if (state.currentOperand === "0") return state;
        result =
          parseFloat(state.previousOperand) / parseFloat(state.currentOperand);
      }
      return {
        previousOperand: "",
        currentOperand: result,
        operation: "",
      };
    default:
      return null;
  }
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand"> {currentOperand}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>
      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
