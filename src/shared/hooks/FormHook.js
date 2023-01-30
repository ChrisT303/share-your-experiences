import { useCallback, useReducer } from "react";

const formStateReducer = (state, action) => {
  switch (action.type) {
    case "inputChange":
      let formIsValid = true;
      for (const inputID in state.inputs) {
        if(!state.inputs[inputID]){
            // this is so we can drop the name in Auth.js when switching forms. If undefined continue (name is undefined so we can drop it in the switch) 
         continue;
        }
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
      case 'setInput':
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
        type: 'setInput',
        inputs: inputData,
        formIsValid: formValidity
    })
  }, [])

  return [formState, userInputHandler, setFormData]
};
