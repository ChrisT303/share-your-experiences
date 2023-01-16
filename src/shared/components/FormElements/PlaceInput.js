import React, { useReducer } from "react";

import "./PlaceInput.css";

const reducerInput = (state, action) => {
  switch (action.type) {
    case "inputChange":
      return {
        ...state,
        value: action.inputVal,
        isValid: true,
      };
    default:
      return state;
  }
};

const PlaceInput = (props) => {
  const [inputState, dispatch] = useReducer(reducerInput, {
    value: "",
    isValid: false,
  });

  const inputChangeHandler = (e) => {
    dispatch({ type: "inputChange", inputVal: e.target.value });
  };

  const elementToggle =
    props.elementToggle === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onInput={inputChangeHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onInput={inputChangeHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {elementToggle}
      {!inputState.isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default PlaceInput;
