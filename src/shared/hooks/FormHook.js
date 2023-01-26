import { useCallback, useReducer } from "react";

const formStateReducer = (state, action) => {
  switch (action.type) {
    case "inputChange":
      let formIsValid = true;
      for (const inputID in state.inputs) {
        if (inputID === action.inputID) {
            formIsValid = formIsValid && action.isValid;
        } else {
            formIsValid = formIsValid && state.inputs[inputID].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputID]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
      case 'InputData':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid
      }
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
      type: "inputChange",
      value: value,
      isValid: isValid,
      inputID: id,
    });
  }, []);

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
        type: 'InputData',
        inputs: inputData,
        formIsValid: formValidity
    })
  }, [])

  return [formState, userInputHandler, setFormData]
};
