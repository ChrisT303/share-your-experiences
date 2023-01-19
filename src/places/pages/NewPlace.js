import React from "react";

import PlaceInput from "../../shared/components/FormElements/PlaceInput";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import {useForm} from '../../shared/hooks/FormHook'
import "./NewPlace.css";



const NewPlace = () => {
 const [formState, userInputHandler ] = useForm({
    title: {
        value: '',
        isValid: false
    },
    description: {
        value: '',
        isValid: false
    },
    address: {
        value: '',
        isValid: false 
    }
 }, false);



  const addPlaceHandler = e => {
    e.preventDefault();
    console.log(formState.inputs);
  }

  return (
    <form className="place-form" onSubmit={addPlaceHandler}>
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
          <PlaceInput
        id="address"
        elementToggle="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid description with at least 5 characters"
        onInput={userInputHandler}
      />
      <Button type='submit' disabled={!formState.isValid}>ADD PLACE</Button>
    </form>

  );
};
export default NewPlace;
