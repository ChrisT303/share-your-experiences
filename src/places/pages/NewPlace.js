import React, { useCallback, useReducer } from "react";

import PlaceInput from "../../shared/components/FormElements/PlaceInput";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./NewPlace.css";

const formStateReducer = (state, action) => {
  switch (action.type) {
    case "userInput":
      let formValidity = true;
      for (const inputID in state.inputs) {
        if (inputID === action.inputID) {
          formValidity = formValidity && action.isValid;
        } else {
          formValidity = formValidity && state.inputs[inputID].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputID]: { value: action.value, isValid: action.isValid },
        },
        isValid: formValidity,
      };
    default:
      return state;
  }
};

const NewPlace = () => {
  const [formState, dispatch] = useReducer(formStateReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  const userInputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "userInput",
      value: value,
      isValid: isValid,
      inputID: id,
    });
  }, []);

  return (
    <form className="place-form">
      <PlaceInput
        id="title"
        elementToggle="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Invalid entry, please try again"
        onInput={userInputHandler}
      />
      <PlaceInput
        id="description"
        elementToggle="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description with at least 5 characters"
        onInput={userInputHandler}
      />
      <Button type='submit' disabled={!formState.isValid}>ADD PLACE</Button>
    </form>

  );
};
export default NewPlace;
