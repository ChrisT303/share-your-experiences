import React, { useState } from "react";
import Card from "../../shared/components/UIElements/Card";
import PlaceInput from "../../shared/components/FormElements/PlaceInput";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/FormHook";
import "./Auth.css";

const Auth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [formState, inputChangeHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchToSignupHandler = (event) => {
    if (!isLoggedIn) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoggedIn((prevMode) => !prevMode);
  };

  const authLoginHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <Card className="authentication">
      <h2>Login</h2>
      <hr />
      <form onSubmit={authLoginHandler}>
        {!isLoggedIn && (
          <PlaceInput
            elementToggle="input"
            id="name"
            type="text"
            label="Username"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a username"
            onInput={inputChangeHandler}
          />
        )}
        <PlaceInput
          elementToggle="input"
          id="email"
          type="email"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address"
          onInput={inputChangeHandler}
        />
        <PlaceInput
          elementToggle="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password with at least 5 characters"
          onInput={inputChangeHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoggedIn ? "LOGIN" : "SIGNUP"}
        </Button>
      </form>
      <Button inverse onClick={switchToSignupHandler}>
        {isLoggedIn ? "SIGNUP" : "LOGIN"}
      </Button>
    </Card>
  );
};

export default Auth;
