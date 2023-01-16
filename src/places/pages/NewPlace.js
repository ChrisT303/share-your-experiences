import React from "react";

import PlaceInput from "../../shared/components/FormElements/PlaceInput";
import "./NewPlace.css";

const NewPlace = () => {
  return (
    <form className="place-form">
      <PlaceInput
        elementToggle="input"
        type="text"
        label="Title"
        validators={[]}
        errorText="Title invalid. Please check and try again"
      />
    </form>
  );
};
export default NewPlace;
