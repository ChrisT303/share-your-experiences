import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceInput from "../../shared/components/FormElements/PlaceInput";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

import "./NewPlace.css";
import { useForm } from "../../shared/hooks/FormHook";

const PlaceHolderPlaces = [
  {
    id: "p1",
    title: "Mile High Stadium",
    description: "where the broncos play football",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/3a/Denver_Mile_High_Stadium_postcard_%28c._1970s-1980s%29.jpg",
    address: "1701 Bryant St, Denver, CO 80204",
    location: {
      lat: 39.7438936,
      lng: -105.0201094,
    },

    userFilter: "u1",
  },
  {
    id: "p2",
    title: "Mile High Stadium",
    description: "where the broncos play football",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/3a/Denver_Mile_High_Stadium_postcard_%28c._1970s-1980s%29.jpg",
    address: "1701 Bryant St, Denver, CO 80204",
    location: {
      lat: 39.7438936,
      lng: -105.0201094,
    },
    userFilter: "u2",
  },
];

const EditPlace = () => {
    // const [isLoading, setIsLoading] = useState(true)
  const placeId = useParams().placeId;

  const foundPlace = PlaceHolderPlaces.find((p) => p.id === placeId);
  
  const [formState, userInputHandler, setFormData] = useForm(
    {
      title: {
        value: foundPlace.title,
        isValid: true,
      },
      description: {
        value: foundPlace.description,
        isValid: true,
      },
    },
    true
  );


  useEffect(() => {
    setFormData(
      {
        title: {
          value: foundPlace.title,
          isValid: true,
        },
        description: {
          value: foundPlace.description,
          isValid: true,
        },
      },
      true
    );
  }, [setFormData, foundPlace]);

  const submitEditHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs);
  };

  if (!foundPlace) {
    return (
      <div className="center">
        <h2>Place not found</h2>
      </div>
    );
  }

  if (!formState.inputs.title.value){
    return (
        <div className="center">
            <h2>Loading...</h2>
        </div>
    )
  }

  return (
    // formState.inputs.title.value && 
    (
      <form className="place-form" onSubmit={submitEditHandler}>
        <PlaceInput
          id="title"
          elementToggle="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={userInputHandler}
          // initializing value only
          initialValue={formState.inputs.title.value}
          initialIsValid={formState.inputs.title.isValid}
        />
        <PlaceInput
          id="description"
          elementToggle="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description with at least 5 characters."
          onInput={userInputHandler}
          // initializing value only
          initialValue={formState.inputs.description.value}
          initialIsValid={formState.inputs.description.isValid}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Edit Place
        </Button>
      </form>
    )
  );
};

export default EditPlace;
