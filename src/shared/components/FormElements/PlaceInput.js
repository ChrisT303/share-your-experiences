import React, { useReducer, useEffect } from "react";

import { validate } from "../../util/validators";
import "./PlaceInput.css";

const reducerInput = (state, action) => {
  switch (action.type) {
    case "inputChange":
      return {
        ...state,
        value: action.inputVal,
        isValid: validate(action.inputVal, action.validators),
        isTouched: true
      };
    default:
      return state;
  }
};

const PlaceInput = (props) => {
  const [inputState, dispatch] = useReducer(reducerInput, {
    value: "",
    isTouched: false,
    isValid: false,
  });

  const {id, onInput} = props;
  const {value, isValid } = inputState

  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput]);

  const inputChangeHandler = (e) => {
    dispatch({
      type: "inputChange",
      inputVal: e.target.value,
      validators: props.validators,
    });
  };


  const elementToggle =
    props.elementToggle === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={inputChangeHandler}
        onBlur={inputChangeHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={inputChangeHandler}
        onBlur={inputChangeHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {elementToggle}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default PlaceInput;
