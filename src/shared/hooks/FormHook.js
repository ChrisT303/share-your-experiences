import { useCallback, useReducer } from "react";

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

export const useForm = (firstInputs, firstFormValidation) => {
  const [formState, dispatch] = useReducer(formStateReducer, {
    inputs: firstInputs,
    isValid: firstFormValidation,
  });

  const userInputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "userInput",
      value: value,
      isValid: isValid,
      inputID: id,
    });
  }, []);

  return [formState, userInputHandler]
};
