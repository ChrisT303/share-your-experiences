import React from "react";
import Card from "../../shared/components/UIElements/Card";
import PlaceInput from "../../shared/components/FormElements/PlaceInput";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import {useForm} from '../../shared/hooks/FormHook'
import "./Auth.css";

const Auth = () => {
const [formState, inputChangeHandler] = useForm({
    email: {
     value: '',
     isValid: false
    },
  password: {
    value: "",
    isValid: false
  }
}, false)

const authLoginHandler = event => {
    event.preventDefault();
    console.log(formState.inputs)
};

  return (
    <Card className="authentication">
      <h2>Login</h2>
      <hr />
      <form onSubmit={authLoginHandler}>
        <PlaceInput
          elementToggle="input"
          id="email"
          type="email"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address"
          onInput= {inputChangeHandler}
        />
        <PlaceInput
          elementToggle="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password with at least 5 characters"
          onInput= {inputChangeHandler}
        />
        <Button type='submit' disable={!formState.isValid}>Login</Button>
      </form>
    </Card>
  );
};

export default Auth;
