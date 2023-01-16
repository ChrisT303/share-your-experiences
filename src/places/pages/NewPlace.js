import React from "react";

import PlaceInput from "../../shared/components/FormElements/PlaceInput";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import "./NewPlace.css";

const NewPlace = () => {
  return (
    <form className="place-form">
      <PlaceInput
        elementToggle="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Title invalid. Please check and try again"
      />
    </form>
  );
};
export default NewPlace;
